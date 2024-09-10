
export interface Character {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    gender:   string;
    origin:   Location;
    image:    string;
}

export interface Location {
    name: string;
    url:  string;
}