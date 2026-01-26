const vietNamCities = [
    {
        "name": "hanoi",
        "country": "VN",
        "latitude": 21.0245,
        "longitude": 105.8412
    },
    {
        "name": "tphochiminh",
        "country": "VN",
        "latitude": 10.8231,
        "longitude": 106.6297
    },
    {
        "name": "danang",
        "country": "VN",
        "latitude": 16.0544,
        "longitude": 108.2022
    },
    {
        "name": "haiphong",
        "country": "VN",
        "latitude": 20.8449,
        "longitude": 106.6881
    },
    {
        "name": "cantho",
        "country": "VN",
        "latitude": 10.0452,
        "longitude": 105.7469
    },
    {
        "name": "angiang",
        "country": "VN",
        "latitude": 10.5215,
        "longitude": 105.1258
    },
    {
        "name": "bariavungtau",
        "country": "VN",
        "latitude": 10.5417,
        "longitude": 107.2429
    },
    {
        "name": "backan",
        "country": "VN",
        "latitude": 22.1473,
        "longitude": 105.8348
    },
    {
        "name": "bacgiang",
        "country": "VN",
        "latitude": 21.2819,
        "longitude": 106.1975
    },
    {
        "name": "baclieu",
        "country": "VN",
        "latitude": 9.2941,
        "longitude": 105.7219
    },
    {
        "name": "bacninh",
        "country": "VN",
        "latitude": 21.1861,
        "longitude": 106.0763
    },
    {
        "name": "bentre",
        "country": "VN",
        "latitude": 10.2433,
        "longitude": 106.3757
    },
    {
        "name": "binhduong",
        "country": "VN",
        "latitude": 11.3254,
        "longitude": 106.477
    },
    {
        "name": "binhdinh",
        "country": "VN",
        "latitude": 13.783,
        "longitude": 109.2196
    },
    {
        "name": "binhphuoc",
        "country": "VN",
        "latitude": 11.7511,
        "longitude": 106.7234
    },
    {
        "name": "binhthuan",
        "country": "VN",
        "latitude": 10.9287,
        "longitude": 108.0972
    },
    {
        "name": "camau",
        "country": "VN",
        "latitude": 9.1768,
        "longitude": 105.1524
    },
    {
        "name": "caobang",
        "country": "VN",
        "latitude": 22.6356,
        "longitude": 106.2522
    },
    {
        "name": "daklak",
        "country": "VN",
        "latitude": 12.71,
        "longitude": 108.2378
    },
    {
        "name": "daknong",
        "country": "VN",
        "latitude": 12.2646,
        "longitude": 107.6098
    },
    {
        "name": "dienbien",
        "country": "VN",
        "latitude": 21.8042,
        "longitude": 103.1076
    },
    {
        "name": "dongnai",
        "country": "VN",
        "latitude": 10.9471,
        "longitude": 106.8196
    },
    {
        "name": "dongthap",
        "country": "VN",
        "latitude": 10.4938,
        "longitude": 105.6881
    },
    {
        "name": "gialai",
        "country": "VN",
        "latitude": 13.8078,
        "longitude": 108.1094
    },
    {
        "name": "hagiang",
        "country": "VN",
        "latitude": 22.8025,
        "longitude": 104.9784
    },
    {
        "name": "hanam",
        "country": "VN",
        "latitude": 20.5835,
        "longitude": 105.923
    },
    {
        "name": "hatinh",
        "country": "VN",
        "latitude": 18.3559,
        "longitude": 105.9056
    },
    {
        "name": "haiduong",
        "country": "VN",
        "latitude": 20.9373,
        "longitude": 106.3145
    },
    {
        "name": "haugiang",
        "country": "VN",
        "latitude": 9.7579,
        "longitude": 105.6412
    },
    {
        "name": "hoabinh",
        "country": "VN",
        "latitude": 20.6861,
        "longitude": 105.3131
    },
    {
        "name": "hungyen",
        "country": "VN",
        "latitude": 20.6464,
        "longitude": 106.0511
    },
    {
        "name": "khanhhoa",
        "country": "VN",
        "latitude": 12.2388,
        "longitude": 109.1967
    },
    {
        "name": "kiengiang",
        "country": "VN",
        "latitude": 10.0125,
        "longitude": 105.0808
    },
    {
        "name": "kontum",
        "country": "VN",
        "latitude": 14.3497,
        "longitude": 108.0005
    },
    {
        "name": "laichau",
        "country": "VN",
        "latitude": 22.3864,
        "longitude": 103.4702
    },
    {
        "name": "lamdong",
        "country": "VN",
        "latitude": 11.5753,
        "longitude": 108.1429
    },
    {
        "name": "langson",
        "country": "VN",
        "latitude": 21.8537,
        "longitude": 106.761
    },
    {
        "name": "laocai",
        "country": "VN",
        "latitude": 22.4809,
        "longitude": 103.9755
    },
    {
        "name": "longan",
        "country": "VN",
        "latitude": 10.6957,
        "longitude": 106.4054
    },
    {
        "name": "namdinh",
        "country": "VN",
        "latitude": 20.4388,
        "longitude": 106.1621
    },
    {
        "name": "nghean",
        "country": "VN",
        "latitude": 19.2342,
        "longitude": 104.92
    },
    {
        "name": "ninhbinh",
        "country": "VN",
        "latitude": 20.2506,
        "longitude": 105.9745
    },
    {
        "name": "ninhthuan",
        "country": "VN",
        "latitude": 11.6738,
        "longitude": 108.8629
    },
    {
        "name": "phutho",
        "country": "VN",
        "latitude": 21.2684,
        "longitude": 105.2045
    },
    {
        "name": "phuyen",
        "country": "VN",
        "latitude": 13.0882,
        "longitude": 109.0929
    },
    {
        "name": "quangbinh",
        "country": "VN",
        "latitude": 17.6102,
        "longitude": 106.3487
    },
    {
        "name": "quangnam",
        "country": "VN",
        "latitude": 15.5393,
        "longitude": 108.0191
    },
    {
        "name": "quangngai",
        "country": "VN",
        "latitude": 15.1214,
        "longitude": 108.8044
    },
    {
        "name": "quangninh",
        "country": "VN",
        "latitude": 21.0064,
        "longitude": 107.2925
    },
    {
        "name": "quangtri",
        "country": "VN",
        "latitude": 16.7943,
        "longitude": 107.1856
    },
    {
        "name": "soctrang",
        "country": "VN",
        "latitude": 9.6037,
        "longitude": 105.98
    },
    {
        "name": "sonla",
        "country": "VN",
        "latitude": 21.1022,
        "longitude": 103.7289
    },
    {
        "name": "tayninh",
        "country": "VN",
        "latitude": 11.3351,
        "longitude": 106.1098
    },
    {
        "name": "thaibinh",
        "country": "VN",
        "latitude": 20.4464,
        "longitude": 106.3365
    },
    {
        "name": "thainguyen",
        "country": "VN",
        "latitude": 21.5671,
        "longitude": 105.8252
    },
    {
        "name": "thanhhoa",
        "country": "VN",
        "latitude": 19.8067,
        "longitude": 105.7851
    },
    {
        "name": "thuathienhue",
        "country": "VN",
        "latitude": 16.4637,
        "longitude": 107.5909
    },
    {
        "name": "tiengiang",
        "country": "VN",
        "latitude": 10.4493,
        "longitude": 106.342
    },
    {
        "name": "travinh",
        "country": "VN",
        "latitude": 9.8124,
        "longitude": 106.2992
    },
    {
        "name": "tuyenquang",
        "country": "VN",
        "latitude": 21.7767,
        "longitude": 105.228
    },
    {
        "name": "vinhlong",
        "country": "VN",
        "latitude": 10.2397,
        "longitude": 105.9571
    },
    {
        "name": "vinhphuc",
        "country": "VN",
        "latitude": 21.3609,
        "longitude": 105.5474
    },
    {
        "name": "yenbai",
        "country": "VN",
        "latitude": 21.7168,
        "longitude": 104.8986
    }
]

export { vietNamCities }
