import mysql.connector

db = mysql.connector.connect(host="freedb.tech", user="freedbtech_PeterYuan", passwd="81704002_oahnauY", database="freedbtech_Appointmeow")

cursor = db.cursor()

createEventTable="""
    CREATE TABLE event(
        eventID INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
        title VARCHAR(80) NOT NULL,
        description VARCHAR(200),
        startTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        endTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        userEmail VARCHAR(80) NOT NULL,
        FOREIGN KEY (userEmail) REFERENCES user(email)
    )
"""

def DateTimeToDate(timeValue):
    """Extracts the date from a string-formatted dateTime variable and return it in string format 'YYYY-MM-DD'"""
    return timeValue[:10]
def DateTimeToTime(timeValue):
    """Extracts the time from a string-formatted dateTime variable and return it in string format 'HH:MM:SS'"""
    return timeValue[11:]

def CreateEvent(title, description, startTime, endTime, userEmail):
    cmd = """INSERT INTO event (title, description, startTime, endTime, userEmail) VALUES (%s, %s, %s, %s, %s)"""
    #Verify the time slot
    events = UserEventsBetweenTime(userEmail, startTime, endTime)
    if len(events) >= 1:
        print("User '" + userEmail + "' already has existing events between time block '" + startTime + "' and '" + endTime + "'")
        return False
    cursor.execute(cmd, (title, description, startTime, endTime, userEmail))
    db.commit()
    print("Successfully created event")
    return "Successfully created event"

def UserEvents(userEmail):
    cmd = """SELECT * FROM event WHERE email = %s"""
    cursor.execute(cmd, (userEmail,))
    results = cursor.fetchall()
    return results

def EventsOnDay(date):
    cmd = """SELECT * FROM event WHERE startTime BETWEEN %s AND %s"""
    cursor.execute(cmd, (date + " 00:00:00", date + " 23:59:59"))
    results = cursor.fetchall()
    return results

def UserEventsBetweenDate(userEmail, startDate, endDate):
    return UserEventsBetweenTime(userEmail, startDate + " 00:00:00", endDate + " 23:59:59")

def UserEventsBetweenTime(userEmail, startTime, endTime):
    cmd = """
        SELECT event.eventID, event.title, event.description, event.startTime, event.endTime, event.userEmail
        FROM event
        JOIN user ON event.userEmail = user.email
        WHERE user.email = %s AND ((event.startTime BETWEEN %s AND %s) OR (event.endTime BETWEEN %s AND %s))
    """
    cursor.execute(cmd, (userEmail, startTime, endTime, startTime, endTime))
    results = cursor.fetchall()
    return results

def RemoveEvent(eventID):
    """Removes an event with eventID"""
    cmd = """DELETE FROM event WHERE eventID = %s"""
    cursor.execute(cmd, (eventID,))
    db.commit()
    print("Successfully removed event")

def AllEvents():
    """Returns a list of events"""
    cmd = """SELECT * FROM event"""
    cursor.execute(cmd)
    results = cursor.fetchall()
    return results


#======================Followins are command scripts===============================

#CreateEvent("Test 1", "Desc 1", "2021-06-08 18:30:00", "2021-06-10 19:15:00", "pyuan@whittleschool.org")

print("==============All existing events==================")
results = AllEvents()
for result in results:
    print(result)
print("===================================================")
