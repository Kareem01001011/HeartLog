import random

f = open("heart data.txt", 'w')
newdata = input("is this a new user? (y/n) ")

id = int(input("last recorded id: (if this is a new user, type -1) "))

ADG = int(input("number of data to generate: "))
arr = []
for i in range(ADG):
    bpm = random.randint(71, 95)
    i += 1
    generatedId = id + i
    if newdata == "y":
        data = '{' +  '"id":' + '"' + f'{generatedId}' + '"' + ', ' + '"bpm":' + '"' + f'{bpm}' + '"' + '}'
        newdata = "n"
    else:
        data = ', {' +  '"id":' + '"' + f'{generatedId}' + '"' + ', ' + '"bpm":' + '"' + f'{bpm}' + '"' + '}'
    arr.append(data)
    f.write(data)
print("Done!")

    # data = ', { "id": "{}", "bpm": "{}"}'   this is much cleaner and better but it kept showing errors. stupid errors i might add
    # data = ', {' +  '"id":' + '"' + f'{generatedId}' + '"' + ', ' + '"bpm":' + '"' + f'{bpm}' + '"' + '}'