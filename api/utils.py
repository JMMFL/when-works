from db import *
import random, string

def gen_key():
	key = ''.join(random.choices(string.ascii_letters + string.digits, k=7))
	return key

