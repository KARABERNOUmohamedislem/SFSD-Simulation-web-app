from django.urls import path

from .views import (
    TobvcbView,
    TofView,
    TobfView,
    TobvcView,
    TovcbView,
    TovcView,
    DenseView,
    NondenseView,
    MaireView,
    BarbreView,
    BparbreView,
    EssailineaireView,
    DoublehachageView,
    ChainageinterneView,
    ChainagesepareView,
    HachagedynamiqueView,
    TriView,
    FusionView,
)

app_name = 'sim'

urlpatterns = [
    path('chapitre1/TObVCb/', TobvcbView.as_view(), name='tobvcb'),
    path('chapitre1/TOF/', TofView.as_view()),
    path('chapitre1/TObF/', TobfView.as_view()),
    path('chapitre1/TObVC/', TobvcView.as_view()),
    path('chapitre1/TOVC/', TovcView.as_view()),
    path('chapitre1/TOVCb/', TovcbView.as_view()),
    path('chapitre2/Dense/', DenseView.as_view()),
    path('chapitre2/NonDense/', NondenseView.as_view()),
    path('chapitre3/M-aire/', MaireView.as_view()),
    path('chapitre3/B-arbre/', BarbreView.as_view()),
    path('chapitre3/B-Plus-arbre/', BparbreView.as_view()),
    path('chapitre4/EssaiLineaire/', EssailineaireView.as_view()),
    path('chapitre4/DoubleHachage/', DoublehachageView.as_view()),
    path('chapitre4/ChainageInterne/', ChainageinterneView.as_view()),
    path('chapitre4/ChainageSepare/', ChainagesepareView.as_view()),
    path('chapitre4/HachageDynamique/', HachagedynamiqueView.as_view()),
    path('chapitre5/Tri/', TriView.as_view()),
    path('chapitre5/Fusion/', FusionView.as_view()),
]
