Searchbar runter, Additem drübber
active <-> inactive
(((listing von unten -> oben scrolling? )))
Suche auch über info feld
Login: LodingState + -animation (Loadingbalken)

Home: refresh -> muss über /Login ? 
              -> LoadingState?

# FilterBy Btns
TYP - ORT - OWNER
state pro btn(false) -onClick-> prev => !prev, class drauf (myIdea)
oder siehe SortBy Btns (Christian)


# SortBy Btns
- Active Btn Group:
NAME - EDITED - DUE
mit state: [active] -> welcher grade gedrückt

- Btns selbst:
state [0, 1, 2] (Asc, Des, Deactivated)
--> triggert useEffect()
  - sort!
  - apply styling class

# styling
Btn onClick eine water drop animation über den button


# open / to check Christian
"aktives" Logout (not on refresh)


# not (render interne setups vs localhost)
kein Logout (cookie kan auf render nicht gelöscht werden)
Fehleranzeige FE: error.statusText
