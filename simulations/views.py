from django.shortcuts import render
from django.views import View
from VisuelLearning.settings import STATIC_URL

# Create your views here.

class TobvcbView(View):
    struct_name = 'TObVCb'
    chapter = 1

    def get_template_name(self):
        return ''.join(['chapitre', str(self.chapter), '/', self.struct_name, '.html'])

    def get(self, request, *args, **kwargs):
        return render(request, self.get_template_name(), {'STATIC_URL':STATIC_URL,'struct_name': self.struct_name})


class TobfView(TobvcbView):
    struct_name = 'TObF'


class TofView(TobvcbView):
    struct_name = 'TOF'


class TobvcView(TobvcbView):
    struct_name = 'TObVC'


class TovcView(TobvcbView):
    struct_name = 'TOVC'


class TovcbView(TobvcbView):
    struct_name = 'TOVCb'


class DenseView(TobvcbView):
    struct_name = 'dense'
    chapter = 2


class NondenseView(TobvcbView):
    struct_name = 'nondense'
    chapter = 2


class MaireView(TobvcbView):
    struct_name = 'maire'
    chapter = 3


class BarbreView(TobvcbView):
    struct_name = 'barbre'
    chapter = 3


class BparbreView(TobvcbView):
    struct_name = 'bparbre'
    chapter = 3


class EssailineaireView(TobvcbView):
    struct_name = 'essailineaire'
    chapter = 4


class DoublehachageView(TobvcbView):
    struct_name = 'doublehachage'
    chapter = 4


class ChainageinterneView(TobvcbView):
    struct_name = 'chainageinterne'
    chapter = 4


class ChainagesepareView(TobvcbView):
    struct_name = 'chainagesepare'
    chapter = 4


class HachagedynamiqueView(TobvcbView):
    struct_name = 'hachagedynamique'
    chapter = 4


class TriView(TobvcbView):
    struct_name = 'tri'
    chapter = 5


class FusionView(TobvcbView):
    struct_name = 'fusion'
    chapter = 5
