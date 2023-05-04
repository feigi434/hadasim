import math


def main():
    opt = '0'
    while (opt != '3'):
        opt = input('Select one of the options:\n1) Rectangular tower\n2) Triangle tower\n3) Exit\n')
        if opt == '3': # Exit
            print('Exit')
            exit(0)

        height, width = input('Enter the height and width of the tower:\n').split()
        height = int(height) 
        width = int(width) 

        if opt == '1': # Rectangular tower
            if height == width or abs(height-width) > 5:
                print(f'The area of the rectangle: {height*width} \n') # Rectangle area
            else:
                print(f'The perimeter of the rectangle: {2*height + 2*width} \n') # Rectangle perimeter
        elif opt == '2': # Triangle tower
            sub_opt = input('Select one of the options:\n1) The triangle perimeter\n2) The triangle print\n')
            if sub_opt == '1': # Triangle perimeter
                print(f'The triangle of perimeter: {triangle_perimeter(height, width)} \n')
            elif sub_opt == '2': # Triangle print
                triangle_print(height, width)
       
def triangle_perimeter(height, width): 
    c = math.sqrt(height ** 2 + width ** 2)
    triangle_perimeter = 2*c + width
    return triangle_perimeter

def triangle_print(height, width):
    if width%2 == 0 or width > 2*height:
        print('The triangle cannot be printed\n')
        return
    
    if width%2 == 1 and width < 2*height:
        jump_amount = math.floor((width/2)-1)
        row_amount = math.floor((height-2)/jump_amount)
        mod = (height-2)%jump_amount

        print_row(1, width) 

        for i in range(3, width, 2):
            current_row_amount = row_amount if i > 3 else (row_amount + mod)
            for j in range(0, current_row_amount):
                print_row(i, width)

        print_row(width, width)

def print_row(num, width):
    spaces_amoumt = math.floor((width-num)/2)
    for i in range(0, spaces_amoumt):
        print(end=" ")

    for i in range(spaces_amoumt, spaces_amoumt + num):
        print(end="*")

    print('\r')

main()

