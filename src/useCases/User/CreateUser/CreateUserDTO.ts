export interface ICreateUserRequestDTO {
    name: string;
    surname: string;
    email: string;
    bio: string;
    username: string;
    password: string;
    telephone: string;
    end_state: string;
    end_city: string;
    end_number: string;
    end_district: string;
    end_cep: string;
    image: Express.Multer.File | undefined;
}