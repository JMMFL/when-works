from db import *
import random, string
from datetime import datetime

def gen_key():
	key = ''.join(random.choices(string.ascii_letters + string.digits, k=7))
	return key

guest_time = db.Table('guest_time', 
	db.Column('guest_id', db.String(7), db.ForeignKey('guest.id')),
	db.Column('time_id', db.DateTime, db.ForeignKey('time.time_id'))
)

