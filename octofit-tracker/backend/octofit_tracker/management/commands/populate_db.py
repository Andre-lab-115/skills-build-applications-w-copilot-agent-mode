from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connections
from djongo import models

from bson import ObjectId

class User(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=100)
    class Meta:
        managed = False
        db_table = 'users'

class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        managed = False
        db_table = 'teams'

class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    user_email = models.EmailField()
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'activities'

class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    user_email = models.EmailField()
    points = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'leaderboard'

class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    class Meta:
        managed = False
        db_table = 'workouts'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        db = connections['default'].cursor().db_conn
        db.drop_collection('users')
        db.drop_collection('teams')
        db.drop_collection('activities')
        db.drop_collection('leaderboard')
        db.drop_collection('workouts')

        # Crear índice único en email
        db['users'].create_index('email', unique=True)

        # Equipos
        teams = [
            {'name': 'Marvel'},
            {'name': 'DC'}
        ]
        db['teams'].insert_many(teams)

        # Usuarios
        users = [
            {'name': 'Superman', 'email': 'superman@dc.com', 'team': 'DC'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'DC'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'DC'},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': 'Marvel'},
            {'name': 'Captain Marvel', 'email': 'captainmarvel@marvel.com', 'team': 'Marvel'}
        ]
        db['users'].insert_many(users)

        # Actividades
        activities = [
            {'user_email': 'superman@dc.com', 'type': 'Vuelo', 'duration': 60},
            {'user_email': 'batman@dc.com', 'type': 'Entrenamiento', 'duration': 45},
            {'user_email': 'ironman@marvel.com', 'type': 'Vuelo', 'duration': 50},
            {'user_email': 'spiderman@marvel.com', 'type': 'Escalada', 'duration': 30}
        ]
        db['activities'].insert_many(activities)

        # Leaderboard
        leaderboard = [
            {'user_email': 'superman@dc.com', 'points': 100},
            {'user_email': 'ironman@marvel.com', 'points': 90},
            {'user_email': 'batman@dc.com', 'points': 80},
            {'user_email': 'spiderman@marvel.com', 'points': 70}
        ]
        db['leaderboard'].insert_many(leaderboard)

        # Workouts
        workouts = [
            {'name': 'Cardio Hero', 'difficulty': 'Alta'},
            {'name': 'Fuerza Extrema', 'difficulty': 'Media'},
            {'name': 'Resistencia Legendaria', 'difficulty': 'Alta'}
        ]
        db['workouts'].insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db poblada con datos de prueba'))
