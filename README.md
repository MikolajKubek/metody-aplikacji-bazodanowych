# Metody tworzenia aplikacji bazodanowych - aplikacja książka kucharska

## Wstęp
Celem projektu było stworzenie aplikacji internetowej, pozwalającej na obsługę książki kucharskiej. Zadaniem aplikacji jest zarządzanie użytkownikami, przepisami, składnikami oraz komentarzami użytkowników. Istotnym elementem aplikacji jest przechowywanie szczegółowych informacji o składnikach danego przepisu, pozwalających na określenie ilości makroskładników w posiłku.

## Analiza
Aplikacja udostępnia interfejs REST API, pozwalający na zarządzanie zawartością bazy danych. Użytkownicy za pomocą żądań http mogą dodawać przepisy, składniki oraz komentarze do poszczególnych przepisów. Identyfikacja użytkowników odbywa się za pomocą tokenów JWT.

## Architektura techniczna
### Wykorzystane narzędzia
1. Docker - utworzenie zamkniętego ekosystemu zawierającego bazę danych, API oraz aplikację frontendową. Docker compose budujący infrastrukturę aplikacji korzystając z obrazu bazy danych postgres oraz zdefiniowanych na potrzebę projektu plików Dockerfile dla frontendu i backendu,
1. Django - obsługa danych za pomocą Django ORM,
    * Django Rest Framework - zapewnienie funkcjonalności CRUD, utworzenie interfejsu API
    * psycopg2 - obsługa komunikacji między aplikacją a bazą danych
1. React - interfejs użytkownika
1. PostgreSQL - baza danych

### Baza danych
![diagram bazy danych][diagram]

[diagram]: db_diagram.png
*diagram bazy danych*

```sql
CREATE TABLE "cookbook_ingredient" (
    "id" serial NOT NULL PRIMARY KEY, 
    "name" varchar(200) NOT NULL UNIQUE, 
    "fats" double precision NOT NULL, 
    "carbohydrates" double precision NOT NULL, 
    "proteins" double precision NOT NULL
    );

CREATE TABLE "cookbook_recipe" (
    "id" serial NOT NULL PRIMARY KEY, 
    "title" varchar(100) NOT NULL UNIQUE, 
    "description" varchar(200) NOT NULL,
    "author_id" integer NOT NULL
    );

CREATE TABLE "cookbook_user" (
    "id" serial NOT NULL PRIMARY KEY, 
    "login" varchar(200) NOT NULL UNIQUE, 
    "password" varchar(200) NOT NULL, 
    "token" varchar(100) NULL
    );

CREATE TABLE "cookbook_recipeingredientassociative" (
    "id" serial NOT NULL PRIMARY KEY, 
    "amount" double precision NOT NULL, 
    "ingredient_id" integer NOT NULL, 
    "recipe_id" integer NOT NULL
    );

CREATE TABLE "cookbook_comment" (
    "id" serial NOT NULL PRIMARY KEY, 
    "content" varchar(200) NOT NULL, 
    "author_id" integer NOT NULL, 
    "recipe_id" integer NOT NULL
    );


ALTER TABLE "cookbook_recipe" ADD CONSTRAINT "cookbook_recipe_author_id_8a2bc8a4_fk_cookbook_user_id" FOREIGN KEY ("author_id") REFERENCES "cookbook_user"("id");
ALTER TABLE "cookbook_recipeingredientassociative" ADD CONSTRAINT "cookbook_recipeingre_ingredient_id_85b47baf_fk_cookbook_" FOREIGN KEY ("ingredient_id") REFERENCES "cookbook_ingredient" ("id");
ALTER TABLE "cookbook_recipeingredientassociative" ADD CONSTRAINT "cookbook_recipeingre_recipe_id_157e33e7_fk_cookbook_" FOREIGN KEY ("recipe_id") REFERENCES "cookbook_recipe" ("id");
ALTER TABLE "cookbook_comment" ADD CONSTRAINT "cookbook_comment_author_id_72e82f94_fk_cookbook_user_id" FOREIGN KEY ("author_id") REFERENCES "cookbook_user" ("id");
ALTER TABLE "cookbook_comment" ADD CONSTRAINT "cookbook_comment_recipe_id_89daaae3_fk_cookbook_recipe_id" FOREIGN KEY ("recipe_id") REFERENCES "cookbook_recipe" ("id");
```
*skrypt tworzący bazę danych*

Baza danych składa się z czterech głównych tabel oraz tabeli obsługującej relację wiele do wielu między przepisem i składnikami.
1. cookbook_recipe: tabela reprezentująca przepis
    * id
    * title: nazwa przepisu
    * description: opis przepisu
    * author_id: id autora przepisu
2. cookbook_ingredient: tabela reprezentująca składnik
    * id
    * name: nazwa składnika
    * fats: zawartość tłuszczy w 100g składnika
    * carbohydrates: zawartość węglowodanów w 100g składnika
    * proteins: zawartość białka w 100g składnika
3. cookbook_recipeingredientassociative: tabela łącząca wiele do wielu składniki i przepisy
    * id
    * amount: ilość składnika w przepisie w gramach
    * ingredient_id: id składnika
    * recipe_id: id przepisu
4. cookbook_user: tabela zawierająca dane użytkownika
    * id
    * login: login
    * password: hasło
    * token: jwt token, któremu musi odpowiadać cookie w żądaniach dodawania nowych przepisów i komentarzy
5. cookbook_comment: tabela zawierająca komentarze do przepisów
    * id
    * content: treść komentarza
    * author_id: id autora komentarza
    * recipe_id: id komentowanego przepisu

### Backend

Modele Django ORM:

Tabele w bazie danych zostały utworzone na podstawie klas - modeli Django:
```python
from django.db import models

class User(models.Model):
    login = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    token = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.login

class Ingredient(models.Model):
    name = models.CharField(max_length=200, unique=True)
    fats = models.FloatField(default=0)
    carbohydrates = models.FloatField(default=0)
    proteins = models.FloatField(default=0)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredientAssociative')

    def __str__(self):
        return self.title

class RecipeIngredientAssociative(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.FloatField()

class Comment(models.Model):
    content = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author}: {self.content}"
```

## Dokumentacja aplikacji

![strona główna][main]

[main]: main.png
*strona główna aplikacji*

Na stronie głównej znajduje się pasek nawigacji oraz lista dostępnych przepisów.

![szczegółowy widok][detailed]

[detailed]: detailed.png
*szczegółowy widok przepisu*

Szczegółowy widok uwzględnia autora przepisu, ilości składników wraz z makroskładnikami i komentarze użytkowników

![detailed comment][detailed_comment]

[detailed_comment]: detailed_comment.png
*formularz komentarza do przepisu*

![add_recipe][add_recipe]

[add_recipe]: add_recipe.png
*formularz dodawania nowego przepisu*

Aby dodać przepis użytkownik musi podać jego tytuł oraz opis.


![add_ingredient][add_ingredient]

[add_ingredient]: add_ingredient.png
*formularz dodawania składnika do przepisu*

Składniki mogą zostać dodane przez właściciela przepisu w każdym momencie po utworzeniu przepisu.

![login][login]

[login]: login.png
*formularz logowania*

## Wnioski i możliwości rozwoju

### Wnioski
* Dostępne obecnie narzędzia znacznie ułatwiają pracę z bazami danych, nie oznacza to jednak że można całkowicie obejść się bez znajomości relacyjnych baz danych. Pomimo interfejsu dostosowanego do języka programowania, którego używamy, nadal najistotniejszym elementem aplikacji bazodanowej jest przemyślana architektura bazy danych.
* Oddzielenie warstwy widoku zapewnia dużą swobodę implementacji oraz łatwiejszą skalowalność aplikacji internetowej.

### Możliwości rozwoju
* Wykorzystanie api w aplikacji pomagającej w trzymaniu diety, liczeniu kalorii
* Rozszerzenie funkcjonalności aplikacji o dopasowywanie przepisów do dietetycznych wymagań użytkownika
* Dodanie integracji z mediami społecznościowymi np.: udostępnianie przepisów