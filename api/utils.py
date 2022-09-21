from db import *
import random, string

def gen_key():
	key = ''.join(random.choices(string.ascii_letters + string.digits, k=7))
	return key

def datetime_range(start, end, delta):
	current = start
	times = [str(current)]
	while current < end:
			current += delta
			times.append(str(current))

	return times



