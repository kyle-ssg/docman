module.exports = {
  "name": "atb",
  "description": "",
  "folders": [
    {
      "id": "9a255f0d-d27d-a7d0-0b58-e3f91ac98bbf",
      "name": " add-to-basket",
      "description": "",
      "owner": "181595",
      "collectionId": "e5b5c20a-f8bd-41e3-bae5-3c7bc33f482c",
      "requests": [
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"ocado\"\n}",
          "method": "POST",
          "description": "",
          "name": "ocado-add-to-basket",
          "url": "http://localhost:3000/basket/298701011",
          "id": "ea9d0ae2-8867-9135-7273-941baed123c8"
        },
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"sainsburys\"\n}",
          "method": "POST",
          "description": "",
          "name": "sainsburys-add-to-basket",
          "url": "http://localhost:3000/basket/walkers-ready-salted-crisps-6x25g",
          "id": "3f94e4a1-6bd5-f357-7bfb-18438486a58a"
        },
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"tesco\"\n}",
          "method": "POST",
          "description": "",
          "name": "tesco-add-to-basket",
          "url": "http://localhost:3000/basket/278416273",
          "id": "deec4031-6e8a-18a5-dcf0-91bc8a6afb2b"
        },
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"asda\"\n}",
          "method": "POST",
          "description": "",
          "name": "asda-add-to-basket copy",
          "url": "http://localhost:3000/basket/910001788627",
          "id": "29e93b5e-a369-fa12-c6a4-2842c5941e90"
        }
      ]
    },
    {
      "id": "cfd15c9b-d7a8-6fd8-ea53-c5bf01233bb8",
      "name": "login",
      "description": "",
      "owner": "181595",
      "collectionId": "e5b5c20a-f8bd-41e3-bae5-3c7bc33f482c",
      "requests": [
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"asda\"\n}",
          "method": "POST",
          "description": "",
          "name": "asda-login",
          "url": "http://localhost:3000/auth",
          "id": "e58cd564-bb32-3c65-cc38-87dbcff1d29e"
        },
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"ocado\"\n}",
          "method": "POST",
          "description": "",
          "name": "ocado-login",
          "url": "http://localhost:3000/auth",
          "id": "36068d8b-fcce-9b0e-248c-b1e614e31ca5"
        },
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"sainsburys\"\n}",
          "method": "POST",
          "description": "",
          "name": "sainsburys-login",
          "url": "http://localhost:3000/auth",
          "id": "befbc100-46f8-019d-ce79-d732e0cec3f1"
        },
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"tesco\"\n}",
          "method": "POST",
          "description": "",
          "name": "tesco-login",
          "url": "http://localhost:3000/auth",
          "id": "0016961f-08e6-a538-9398-b4f2348c5f7a"
        }
      ]
    },
    {
      "id": "438c34da-6146-1320-941b-0aefe6ab711a",
      "name": "tests",
      "description": "",
      "owner": "181595",
      "collectionId": "e5b5c20a-f8bd-41e3-bae5-3c7bc33f482c",
      "requests": [
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"asda\"\n}",
          "method": "GET",
          "description": "",
          "name": "login-test",
          "url": "http://localhost:3000/test/auth",
          "id": "a00ed87b-16a3-afb1-dc73-66fa792770fd"
        },
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"asda\"\n}",
          "method": "GET",
          "description": "",
          "name": "offer-test",
          "url": "http://localhost:3000/test/offer/asda/910001788627",
          "id": "2db79568-63a3-d139-97e7-c3a56bf5ba8a"
        },
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"sainsburys\"\n}",
          "method": "GET",
          "description": "",
          "name": "stress-test",
          "url": "http://localhost:3000/test/stress",
          "id": "e18dcb26-6bb3-c595-9e54-e27e71dd988a"
        },
        {
          "headers": "{\n  \"authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imt5bGVAc29saWRzdGF0ZWdyb3VwLmNvbSIsInBhc3N3b3JkIjoiUzBsMWRzdDgiLCJpYXQiOjE0NzYxMjQ1NTF9.cm5YApRskU6YhF5LJM1Ok5ovWoophp-ijoofoh5yCuE\",\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"retailer\": \"asda\"\n}",
          "method": "POST",
          "description": "",
          "name": "token-add-to-basket",
          "url": "http://localhost:3000/basket/910001788627",
          "id": "28649eaf-bda7-fb1a-95ab-7e585a0f7163"
        },
        {
          "headers": "{\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"username\":\"kyle@solidstategroup.com\",\n\t\"password\": \"S0l1dst8\",\n\t\"retailer\": \"asda\"\n}",
          "method": "POST",
          "description": "",
          "name": "offer-test",
          "url": "http://localhost:3000/test/offer/asda/910001788627",
          "id": "e6bf843f-96de-303d-7cb5-13a9d1ec6281"
        },
        {
          "headers": "{\n  \"authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imt5bGVAc29saWRzdGF0ZWdyb3VwLmNvbSIsInBhc3N3b3JkIjoiUzBsMWRzdDgiLCJpYXQiOjE0NzYxMjQ1NTF9.cm5YApRskU6YhF5LJM1Ok5ovWoophp-ijoofoh5yCuE\",\n  \"Content-Type\": \"application/json\"\n}",
          "body": "{\n\t\"retailer\": \"asda\"\n}",
          "method": "POST",
          "description": "",
          "name": "token-auth",
          "url": "http://localhost:3000/auth",
          "id": "9fe9ca95-0fba-9055-0ecd-d9e6dfd933aa"
        }
      ]
    }
  ]
}