from db import *

class Time(db.Model):
	time_id = db.Column(db.DateTime, primary_key=True, nullable = False)

	def __repr__(self):
		return f"{self.time_id}"

	def __init__(self, time):
		self.time_id = time