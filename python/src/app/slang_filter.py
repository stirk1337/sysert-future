import re

import pymorphy2

from .models import Slang

word_pattern = r"[А-яA-z0-9\-]+"


class PymorphyProc(object):
    morph = pymorphy2.MorphAnalyzer()

    @staticmethod
    def test(text):
        return len([w for w in PymorphyProc._gen(text)])

    @staticmethod
    def _gen(text):
        for word in re.findall(word_pattern, text):
            if len(word) < 3:
                continue
            normal_word = PymorphyProc.morph.parse(word.lower())[0].normal_form
            if normal_word in PymorphyProc.get_words():
                yield word

    @staticmethod
    def get_words():
        return Slang.objects.values_list("word", flat=True)
