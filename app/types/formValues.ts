export interface FormValues {
    [key: number]: {
        image: string;
        title: string;
        description: string;
        price: string;
        rating: number;
        tags: string;
    }
}