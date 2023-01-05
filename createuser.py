import random

f = open("new user.txt", 'a')

lastUserId = str(int(input("Last user ID: ")) + 1)
name = input("Name: ")
birthDate = input("Date of birth: ")
nationalId = input("National ID: ")
emailAddress = input("Email Address: ")
phoneNumber = input("Phone Number: ")

data = '"patientID":"{}", "patientName": "{}", "dateOfBirth": "{}", "nationalID": "{}", "emailAddress":"{}", "phoneNumber":"{}", "hb": [  ]'
f.write("const ID" + lastUserId + " = '{" + data.format(lastUserId, name, birthDate, nationalId, emailAddress, phoneNumber) + "}';")
print("Done!, Saved to \"new user.txt\"")
