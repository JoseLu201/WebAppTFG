

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../TextGAN-PyTorch/')))

from generate_text import say

print(say())