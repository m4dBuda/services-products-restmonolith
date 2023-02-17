--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-02-16 22:20:06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16412)
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    criado_em timestamp without time zone DEFAULT now() NOT NULL,
    alterado_em timestamp without time zone,
    ativo boolean DEFAULT true NOT NULL
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16411)
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categorias_id_seq OWNER TO postgres;

--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 216
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- TOC entry 215 (class 1259 OID 16400)
-- Name: produtos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produtos (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    descricao character varying(2000) NOT NULL,
    valor numeric(10,2) NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    alterado_em timestamp without time zone,
    id_categoria integer NOT NULL
);


ALTER TABLE public.produtos OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16399)
-- Name: produtos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produtos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produtos_id_seq OWNER TO postgres;

--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 214
-- Name: produtos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produtos_id_seq OWNED BY public.produtos.id;


--
-- TOC entry 3181 (class 2604 OID 16415)
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- TOC entry 3178 (class 2604 OID 16403)
-- Name: produtos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos ALTER COLUMN id SET DEFAULT nextval('public.produtos_id_seq'::regclass);


--
-- TOC entry 3334 (class 0 OID 16412)
-- Dependencies: 217
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (id, nome, criado_em, alterado_em, ativo) FROM stdin;
2	Automotivo	2023-02-16 02:17:13.697	2023-02-16 02:24:48.188	t
1	Informática	2023-02-16 01:27:47.83	2023-02-16 02:27:09.309	t
3	Móveis	2023-02-16 03:58:59.689	2023-02-16 03:58:59.69	t
67	Teste	2023-02-16 20:38:40.075	2023-02-16 20:38:40.075	t
\.


--
-- TOC entry 3332 (class 0 OID 16400)
-- Dependencies: 215
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produtos (id, nome, descricao, valor, ativo, criado_em, alterado_em, id_categoria) FROM stdin;
1	PNEU YOKOHAMA ADVAN FLEVA V701 235/55 R18 100V	O novo pneu Yokohama ADVAN FLEVA V701 reforça a linha de produtos Premium ADVAN, com um conceito focado no aumento do controle do veículo.	1270.00	t	2023-02-16 03:08:39.243	2023-02-16 03:09:51.377	1
2	Apple MacBook Air (M2 da Apple, com 8 GPU, 8GB RAM, 256GB SSD)	Modelo: MacBook Air, Processador: Chip M2 da Apple, GPU de 8 núcleos, CPU de 8 núcleos (4 de desempenho e 4 de eficiência), Armazenamento: SSD 256GB, Memória: 8GB	8999.00	t	2023-02-16 03:20:17.592	2023-02-16 03:24:27.079	1
4	Sofá 4 Lugares Linoforte Benetton com Assento Retrátil	Altura: 1,04 m, Largura: 2,29 m, Profundidade: 1,58 m, Material: Madeira de Eucalipto / Espuma	1899.00	t	2023-02-16 04:00:12.689	2023-02-16 04:00:12.689	3
3	PNEU YOKOHAMA ADVAN FLEVA V701 235/55 R18 100V	O novo pneu Yokohama ADVAN FLEVA V701 reforça a linha de produtos Premium ADVAN, com um conceito focado no aumento do controle do veículo.	1270.00	f	2023-02-16 03:20:23.832	2023-02-16 04:01:01.692	2
42	Teste	Descricao Teste	10000.00	t	2023-02-16 20:38:40.077	2023-02-16 20:38:40.077	67
\.


--
-- TOC entry 3342 (class 0 OID 0)
-- Dependencies: 216
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_id_seq', 67, true);


--
-- TOC entry 3343 (class 0 OID 0)
-- Dependencies: 214
-- Name: produtos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produtos_id_seq', 42, true);


--
-- TOC entry 3187 (class 2606 OID 16418)
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- TOC entry 3185 (class 2606 OID 16409)
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (id);


--
-- TOC entry 3188 (class 2606 OID 16421)
-- Name: produtos produtos_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id);


-- Completed on 2023-02-16 22:20:06

--
-- PostgreSQL database dump complete
--

