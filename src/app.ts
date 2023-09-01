import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    email: any;

    findUser(email: string){
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): void {
        if (this.users.some(rUser => { return rUser.email === user.email })) {
            throw new Error('User with same email already registered.')
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    removeUser(email: string): void {
        const index = this.users.findIndex(user => user.email === email);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
    
    registerBike(bike: Bike): void {
        bike.id = crypto.randomUUID()
        this.bikes.push(bike)
    }

    rentBike(bikeid: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeid);
        const user = this.findUser(userEmail);
        if (bike && user) {
            const newRent = Rent.create(this.rents, bike, user, startDate, endDate);
            this.rents.push(newRent);
        }
    }    

    returnBike(bike: Bike): void {
        const rentedIndex = this.rents.findIndex(rent => rent.bike.id === bike.id && !rent.dateReturned);
        if (rentedIndex !== -1) {
            this.rents[rentedIndex].dateReturned = new Date();
        }
    }
    
}
