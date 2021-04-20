export const createUserTable = `CREATE TABLE IF NOT EXISTS public.user (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name character varying(256) NOT NULL,
    last_name character varying(256) NOT NULL,
    created_at date DEFAULT now() NOT NULL,
    updated_at date DEFAULT now() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    is_validated boolean DEFAULT false NOT NULL
);`;
