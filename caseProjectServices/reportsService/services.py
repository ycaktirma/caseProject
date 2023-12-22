from customersService.models import Customer
from productService.models import Product
from typing import List

def report():
    #Get all customers
    customers:List[Customer] = Customer.objects.all()

    result = []

    #TODO: Need to reduce the complexity of this report algorithm. Works for now but it is not the best approach.Avoid nested loops later.
    index=0 #Used to display id of rows.
    for customer in customers:
        productsOfCustomer = Product.objects.filter(customer = customer)
        monthlyCost = 0
        for product in productsOfCustomer:
            #Calculate monthly cost of every product that customer has
            monthlyCost += (product.waterCost * product.cost)
            result.append(
                {
                    "id":index,
                    "customer": customer.name,
                    "product": product.name,
                    "monthly_consumption": product.waterCost,
                    "monthly_cost": monthlyCost
                }
            )
            index = index+1
    return result

