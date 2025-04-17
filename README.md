# cv frontend

detta är en fristående webbplats som använder ett rest api för att visa och lägga till arbetserfarenheter. sidan är skapad som del av kursen backend-baserad webbutveckling.

## teknik

- html
- css
- javascript
- fetch api
- parcel som utvecklingsmiljö

## sidor

### index.html
visar en lista med alla erfarenheter. datan hämtas från api:t med fetch och visas direkt på sidan.

### add.html
formulär för att lägga till en ny erfarenhet. formuläret skickar data till api:t via fetch post och visar ett meddelande när det lyckas.

### about.html
innehåller information om uppgiften, vilka tekniker som använts och vilka slutsatser som dragits.

## api

sidan använder ett eget rest api som ligger på:
http://localhost:3000/api/workexperience

api:t är byggt med express och mysql. det måste vara igång för att denna webbplats ska fungera.

## hur man startar

1. installera beroenden
npm install

2. starta utvecklingsservern
npm run start


parcel startar då sidan på http://localhost:1234

notera att api:t också måste vara igång på port 3000

