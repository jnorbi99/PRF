A project elinditasa:

1. lepj be a 'backend' konyvtarba
2. node 18.14.1-es verziot hasznaltam (ha kell, telepitsd)
3. add ki az 'nvm use' parancsot a backend mappajaban (a 2. pont miatt)
4. 'npm init' parancs
5. 'npm run star' parancs

Ezutan a 'http://localhost:3000' url-en elerheto lesz az app.

Funckciok:

    - Regisztracio es belepes utan, TODO-kat tudunk felvenni, modositani, torolni a fo oldalon. Ha felvettunk TODO-kat akkor azokat listaban fogjuk altni magunk elott. Illetve a jelszo valtoztatas is lehetseges.

    - Van egy admin fiok (username: admin, password: admin), ezen az accountot kilistazva latjuk bejelentkezes utan a regisztralt felhasznalokat. Torolni is tudjuk oket (Ez torli az adott szemelyhez tartozo ossze TODO-t).

Az alabbi funciokkal rendelkezik az app:

    - Registration, Login, Logout, DeleteUser, PasswordUpdate, CreateTodo, UpdateTodo, DeleteTodo, GetAllTodo, hibakezelesek (invalid pw, no user), guardok vedik a routokat, admin nem tud todo-t letrehozni, felhasznalo nem tud accountokat torolni.

Dokumentaciom nincs, viszont elvileg a megadott feladatok kozul mindet tudtam teljesiteni.
