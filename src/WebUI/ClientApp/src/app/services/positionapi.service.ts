import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

export interface PositionHolder {
    personID: number;
    begin: string;
    end: string | null;
    firstName: string;
    lastName: string;
}

export interface PositionEdit {
    positionID: number;
    name: string;
    shortName: string;
}

export interface Position {
    positionID: number;
    name: string;
    shortName: string;
    isActive: boolean;
    currentHolders: PositionHolder[];
}

export interface PersonAssignment {
    personID: number;
    name: string;
}

@Injectable()
export class PositionApiService {
    positionApiRoot: string;
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        this.positionApiRoot = this.baseUrl + 'api/Position';
    }

    public getAll(): Observable<Position[]> {
        return this.http.get<Position[]>(this.positionApiRoot);
    }

    public get(id: number): Observable<Position> {
        return this.http.get<Position>(this.positionApiRoot + '/' + id);
    }

    getAssignmentsSuggestion(): Observable<PersonAssignment[]> {
        const persons: PersonAssignment[] = [];
        for (let i = 0; i < 100; i++) {
            persons.push({personID: i, name: "test"+i});
        }
        return from([persons]);
    }

    public update(position: PositionEdit): Observable<any> {
        return this.http.put(this.positionApiRoot + '/' + position.positionID, position);
    }

    public replace(positionID: number, date: string, personsToDismiss: number[], personsToAssign: number[]): Observable<any> {
        console.log(`assigning ${personsToAssign.join(', ')}, dismissing ${personsToDismiss.join(', ')} to ${positionID} for date ${date}`);
        return from([null]);
    }

    public assign(positionID: number, date: string, personsToAssign: number[]): Observable<any> {
        this.replace(positionID, date, [], personsToAssign);
        return from([null]);
    }

    public dismiss(positionID: number, date: string, personsToDismiss: number[]): Observable<any> {
        this.replace(positionID, date, personsToDismiss, []);
        return from([null]);
    }

    public deprecate(positionID: number, date: string): Observable<any> {
        return from([null]);
    }

    public reactivate(positionID: number): Observable<any> {
        return from([null]);
    }

    public create(position: PositionEdit): Observable<any> {
        return this.http.post(this.positionApiRoot, position);
    }
}
