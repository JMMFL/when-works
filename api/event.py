from db import *
from utils import *
from datetime import datetime

class Event(db.Model):
	key = db.Column(db.Integer, primary_key=True)
	id = db.Column(db.String(7), nullable=False, unique=True)
	event_name = db.Column(db.String(100), nullable=False)
	host_name = db.Column(db.String(100), nullable=False)
	created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
	guests = db.relationship('Guest', backref='event')


	def __repr__(self):
		return f"Event: ID = {self.id}, Event Name = {self.event_name}, Host Name = {self.host_name}"

	def __init__(self, event_name, host_name):
		self.event_name = event_name
		self.host_name = host_name
		self.id = gen_key()

	def formatJSON(self):
		names = []
		guest_ids = []
		for guest in self.guests:
			names.append(guest.name)
			guest_ids.append(guest.id)

		return {
			"id": self.id,
			"event_name": self.event_name,
			"host_name": self.host_name,
			"created_at": self.created_at,
			"guests": names,
			"guest_ids": guest_ids
		}