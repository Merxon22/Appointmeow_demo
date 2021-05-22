import mysql.connector

db = mysql.connector.connect(host="freedb.tech", user="freedbtech_PeterYuan", passwd="81704002_oahnauY", database="freedbtech_Appointmeow")

cursor = db.cursor()

createUserTable = """
    CREATE TABLE user(
        userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
        userName VARCHAR(16) NOT NULL UNIQUE,
        email VARCHAR(80) NOT NULL UNIQUE,
        password VARCHAR(32) NOT NULL,
        identity VARCHAR(16) NOT NULL,
        grade INT,
        class VARCHAR(16)
    )
"""

def CreateUser(userName, email, password, identity, grade, homeroom):
    cmd = """INSERT INTO user (userName, email, password, identity, grade, class) VALUES(%s, %s, %s, %s, %s, %s)"""
    cursor.execute(cmd, (userName, email, password, identity, grade, homeroom))
    db.commit()
    print("Successfully created user '" + str(userName) + "' to 'user' table.")

def UserName(email):
    cmd = """SELECT userName FROM user WHERE email = %s"""
    cursor.execute(cmd, (email, ))
    result = cursor.fetchone()
    print("Successfully fetched user '" + str(email) + "'s user name.")
    return str(result[0])

def UserPassword(email):
    cmd = """SELECT password FROM user WHERE email = %s"""
    cursor.execute(cmd, (email,))
    result = cursor.fetchone()
    print("Successfully fetched user '" + str(email) + "'s password.")
    return str(result[0])    

def UpdatePassword(email, password):
    cmd = """UPDATE user SET password = %s WHERE email = %s"""
    cursor.execute(cmd, (password, email))
    db.commit()
    print("Successfully updated user '" + str(email) + "'s password.")

def UpdateUserName(email, userName):
    cmd = """UPDATE user SET userName = %s WHERE email = %s"""
    cursor.execute(cmd, (userName, email))
    db.commit()
    print("Successfully set user '" + str(email) + "'s user name to '" + str(userName) + "'.")

def AllUsers():
    """Returns a list of users"""
    cmd = """SELECT * FROM user"""
    cursor.execute(cmd)
    results = cursor.fetchall()
    return results

def AllUserNames():
    """Returns a list of user names"""
    cmd = """SELECT userName FROM user"""
    cursor.execute(cmd)
    results = cursor.fetchall()
    return results

def RemoveUser(userName):
    cmd = """DELETE FROM user WHERE userName = %s"""
    cursor.execute(cmd, (userName,))
    db.commit()
    print("Successfully removed user '" +str(userName) + "' from table 'user'.")
