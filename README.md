# open / to check Christian =========
Search + Filter states zusammenführen

user-Mgmt: DB conn geht zu jew collection...

Home: refresh -> muss über /Login ? 
              -> LoadingState?

"aktives" Logout (not on refresh)

# SortBy Btns ===============
- Active Btn Group:
NAME - EDITED - DUE
mit state: [active] -> welcher grade gedrückt

- Btns selbst:
state [0, 1, 2] (Asc, Des, Deactivated)
--> triggert useEffect()
  - sort!
  - apply styling class


# styling ===============
Login: LodingState + -animation (Loadingbalken)
Btn onClick eine water drop animation über den button
Icons (Del, Edit, Add)



# not (render interne setups vs localhost)
kein Logout (cookie kan auf render nicht gelöscht werden)
Fehleranzeige FE: error.statusText

-----

Searchbar runter, Additem drübber
active <-> inactive
(((listing von unten -> oben scrolling? )))
Suche auch über info feld
Su-Markt filter fix

# FilterBy Btns
TYP - ORT - OWNER
state pro btn(false) -onClick-> prev => !prev, class drauf (myIdea)
oder siehe SortBy Btns (Christian)

