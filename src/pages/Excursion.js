import { useQuery } from '@apollo/client';
import React from "react";
import "../index.css"
import { QUERY_EXCURSIONS } from '../utils/queries';

// const excursion = [
//   {
//     id: 1,
//     excursion: "Rover Mission",
//     description:
//       "Our most popular excursion - Head out for a once-in-a-lifetime drive around a whole new planet! Join the greater explorer in you and discover what Mars has to offer in a safe rover vehicle!",
//     href: "#",
//     cost: "$119/person",
//     imageSrc:
//       "https://live.staticflickr.com/65535/52503464748_41673f2820_n.jpg",
//     imageAlt: "Mars Rover",
//   },
//   {
//     id: 2,
//     excursion: "Carrot Top Concert",
//     description:
//       "Who doesn't want to see Carrot Top? Especially in space? Come see this incredible artist before the venue is outta space! This is the next sold out event you do not want to miss!",
//     href: "#",
//     cost: "$75/person",
//     imageSrc:
//       "https://live.staticflickr.com/65535/52502425607_8009099d0c_b.jpg",
//     imageAlt: "Carrot Top with various items in the backgrounds",
//   },
//   {
//     id: 3,
//     excursion: "Moon Hike",
//     href: "#",
//     description:
//       "Let's get sweaty in our space suits! Take a 3 hour round into one of Mars' most beatiful cliff bottoms. This will be a moderate hike with views out of this world! Literally!",
//     cost: "$85/person",
//     imageSrc: "https://live.staticflickr.com/65535/52502432987_e88a47dbb7.jpg",
//     imageAlt: "person walking on the moon with Earth in the background",
//   },
//   {
//     id: 4,
//     excursion: "Ghost Tour",
//     href: "#",
//     description:
//       "Those who have left us haven't always left us for good! Come meet the spirits that haunt our solar system! Grab your ghouls and head over to the spook of a lifetime! ",
//     cost: "$99/person",
//     imageSrc: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgWFhYZGRgaHBwaHBwaHBweHhweHhwcHBoaHBocIS4lHB4rJBwcJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQrJCw0NDQ0NDQ0MTQ1NDQ0NDQ0NDQ0NDQ0NDQ0NTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIANoA5wMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwABBAcFBgj/xAA+EAABAwIDBAgEBAUDBQEAAAABAAIRITEDQVEEEmFxBQYigZGhwfATMrHRB0Lh8VJicoKSI6LCFCRzstIz/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwUEBv/EACsRAAICAQQBAwMDBQAAAAAAAAABAhEDBBIhMUEFUWEiMoETQrEUcZGh0f/aAAwDAQACEQMRAD8A42SmYeE5wcQKNEngEAREETe8HSmSRQJUVwrDta38TSfeiABI+6ohH4KfD5Wm/GPHggKJMeCFyElFN5qgLLdFInjz4KgM9FbQoRRAUR9zBnjEeWSpoRgEHQg+YVBAEaTIryVkTaZVRaM/rP7eKtzjJil7HynNAWWwxVOY8Gh0WYg5+5qiDTpJ4VSaGp0aHYYASHNMxzPddXiMcCQRBGqWhA5p9FgcffDVRoCINFKz3G+nNVPv1TAk38P24oQEc3HdzrxVNagASE1rY0Pf5yLoSBX33KmOqgF2aA0H3dKeyPqmsOWiHHdS1fSqlXZq1HaIaJpA1/RP3dBCDBdBtPDuVOcQf015qkZ9DcV7S1oAIIneM30jRRI3Znh7pqrQFgEeWYsqCJoFffiqQSHGSUrJKhQBRKvKVe4bQZNuM2hTeqYpOQ00QIjQTQCSYH7K3CHGREG0+UqA1JsbiNfQKo1QAQ9/ZHIznu1Qge/0XsdDdXNo2mPhMO7MFzqNGpk6aAFIU8kYR3SaS+Tx2zEczfhXOMua9TonoHaNoIGFhkiamzRzcaeEmi6V0D1G2fBriD4z9SOyOTbHmZX1rMMARTg0Cg4Qg42f1dK44lfyznvR34ZsicbGJP8ADhgAcRvGZ8AvoNi6i7FhwThF5/nJP+23kvo3PiwS3POZraiG0jmS1Wpy9yf44FYPRmAwANwsNoFoa0fQJjntFGgDkB5JIYSZFefotLMGOJy4JW5ENKPMnbFtaHXAdzCxbf1c2fGH+pgYZOobuu/ybB816wZqiJTjD3J/qJRdw4PhNu/DXAdXCxH4ZyBhwnkYPmvi+nuqG07MJcwPYJ/1GSRH8wu3wjiV2XaOk8Bnz4jG67zgPqpgdJYD/kxWOH8rmu+hTaS8ntweoamHLVr5/wCn57+AYn39lMNwFxPj6LtHTHUzZceXMHwnmu8yN2eLLHmIPFc26w9U9o2YlxZvMH52AlsfzC7TzpxKVnZ0+tx5eOn7M+ee1LKLeQSme0JpreFN6VMsvWn7+Stsio7jpxHFABmLiOVSefvVTFJgGfulBMZUyTEZ590IHYt4IMFRETMzJcc7851KiAAUhFCsjzQIGfFRwRwQL3QsAJE0GaBFAnU6forytrXwp5HxUKNjZgIAABamYYA3nVyA9AqOGQOAr9B6jxXSupPVTda3aMZsvIljTZgNnEZuNOXOyZhqNRHBDdL8IwdU+oxfGLtLN1p7TcM0J03swOFOOi6QxjGtDWgNaBAaKAAZACyj3GIWRzJPl38UnKuj5rLknqZbsj48L2NJxNI7kk4vjfyRYGCTym6czBblUpcyM/og67MoebDRNw8EuMmy0twxpRTacVrGlznBrWiXOJgADUpqHuDy3xFFsYAvI6b6zbPsw7bwXZMb2nHmPyjiYXP+tHXt+KXYezE4eEKbwkOfXI3a3OLxpZfFOxJrWczN5vx81adKke/B6U5VLM6+F3+WfddJfiVjOJGDhtYMi7tO9APNfLbX1i2nEkvx3mRUTA5AAQvNnQQj2bZy97WCN5xgTbvRXudfFpcOPiMV/LE4jpMySTUk3nOs15qgfFXiYZBINwSKcDCFFHoG4OO5lWucDkQ4iONF62y9Z9tw/lx3wMnHeEGtnTReIjmlhS5rN+ccEmgcIvtJmrpDaziOLnMYxxq4NaWhx1LbA1No8VjM56U5XHcqATt0xBNJpTP3HkihpJcIWDRE2AZBFINRe0iM/sFWURQG8a6nSn1T8QM3GlrjvVDmwYpMOBtW0IKEBtYIr4R42WjAw6gGxiZABrxuAkFpFTnFjfvTG4lCK8NcoB5QhAi/h9sgOAvWw7vsojGUUIzBM+KiVmuwynP0shCJWSmZFFU6qJQDhlTLv4i6CSy6RWtIHBHgvAImyFjUQZ2oiTMQDc2ABHFAXR9R1M6IG07RvubOHhQSDZxnsj1I4cV2BppW68Lqv0UNmwGsjtXcRm4/Me6w5Be4Hx6KUz5nX5nmycdLoXjHJZ2C8j9fum7kzOSZh6+XBT2zGLSiNwRN6cOCbupTX5p00Wsao807sDGxGtaXOIa1oJJJgAC5JXGuuHWs7W/cYSMBpO60ULiLOd31A9be3+JnWOf+0wjQQcYjM3azuueMDIr4DcdDaQKxJia8TS96BEmd703RqMVlmuX18IBrBEoYFTlMATXgbJzG+z6d0JNWmQSCMxTgkdlootKjYlRrkQCLFQMKnDIKFCVSEypUIRsZKhZCYiYbZROb5qo4jz+2SgKgpBEDuzqYJyyyp4HVG3CrStjb0motdA5wigHOs/aO7K6YQNVSQmyn4cSOOmlM6jkphtrEyJmkxzg60TMRkAE515jXvQYb7okio8vkeTS3C3M14qkOFQzAPNRZHrT4MiLCwnPMNEmCfBSTrlHdeE7AxCw7zTB++qujyCWMJyTGspVHhuj37lWBWoOR8ap0SLeKL6n8Pei/ibS17qtwm74H8xMN9Xf2r5ksmBIrzpzousfh70d8PZviEdrEJcSf4RRo8ATzcokeLXZf08Lrt8H0wEnlZWD79/RQjLxVOBmo95d6k+eLxKiArIp791VP/RG9tB4H0TGvCBYYv+3BeV1l6c/6fZ34mfytH8TjMDkIJPAFeg92mq5R166V+NtBY0yzC7IAsXfnd40/t4oTPfpdMsk1u6PCEu7TquJJcZq4kkknjU1SgwNPvuqiwsQW9+ac0VTbo+ox44tcCyayBl7KVjNMxprSNbrW7DArksrwLJoicWuGZ3NQkJxMBJcmZMpt7wiDaqmtt948zQKxHdXmNDaP2NqJp0Sx7QCI9/okuFhnpxm3HLxTXESAS6IEEVkcJiBw5osPAa4zvSBEg3MmMspohuxxRmaSJ8/1Ue0gwVqfgFogNkA/MD71CRu1iIT6BpgNYTQAk6AT9Fv6N2tzHB24HNggh4BBMaxRBsr3sf2JDoLZoaOEGKUN6pTm1PpYJ2hqL7Ke23uvBU1qtQOUspUMsFSEPANRI0kjzCimjXcJBVqnKSrR5h2k1Fr6fRGzD493v3VLYntfXT7Zp0ImFhFz2sFyWjjJcAAO8ru+xYIZhsY0QGgN8AuQ9TtnGJtmHIo0uea5NFJHBxHguyPB7llJ8nF9UnzGP5BbO8fL7JjGVnQIMCs8/cp4FYQkcpuuBFyixnwONkVis+0v9yk+DWEdzRh6V2r4WDi42bWOI/qAJaPGAuIYg/mJkVNeZB1qF1nry4jYMWsEuwxfIvE/RcmcI/YHxTiju6GKUW/mgXOrMX+/ktWCSRbjyWdzIilwDeckTn6XyTkjq4Z7WPxHkjdaRNDGut8xThAJWZjXE87Z1vUCopW1YSnuqiYyULgicnKVh77SdAYuBqJN6ZpeGzeuY+6cMIwRS4Ikka2rHOa0EJm27UHhoaxrA1rWndABdBudcvCTYQyf7mfFxABut4ySBW1jfJJ3p4DQTApEx3XVSrY2dfevBAjRgbOTSDvOgMsGurBkmnfKUBB4g/REGzcwK8hwHP1VBsmg7kAO2fHcw988ePCvoFZqd+oE5QLaJANQePmmdqpkm8kZyfMFNIdjRSwj0HNLeFTHwtjsMOAVJFJ2uDC0qiBrWbespr8OLe+CosIgkcciImKjKuqGuCb8CoUWhmGwgkkh00AFCOfD7XUU0MzvbFxXnyIoPdeCUE4NPf8AdC9kGqaM2CCntxZEnLSh8fVJez0PiqcafVDFZ9d+HrZ2pxAkDDde/wAzNF1kuoOS5b+GjI2jEBofhG4qO0xdQeZbzWT7OH6jzlobgGnemH5jy980rBNO5OBEg6hVE5ku2K2gwRzSNqaAFreybpG1CWe6qZLs3wy5R8v13af+hxYqWuw3HOO20eq5Y9utAc8vf6rsXTWz7+zY+GBJOG6B/E4AlvmFxljuya92ukevcnF8He0X2tfNgvI1rHnSnCiEYmfd78Fe6YOkidLEN8pS3NVM9q4I41qMvqJB+iZgwIJqMwJmK90/dAa1zkk0i/lrSP0JhOUSDMgA3ihyjhqSgCDEKohUWx70pQ51lNLYE0reeYPpkgZn4omtrB5Ug+sHxRzWsEDwPhB9UT3dqSd+skmZdrJNZQSNdhlzS8mlGg1Jc7QyT+XO1AM0OMBItVooD8ppeeGWU3oQre8ONgKkgZAXI4/otGO8lkuHaBO86SS6Y3Q4ExTtZA9oTMJ7eeBbvcyOYBUOHnrpEIQBHHK3GZrTKO9AjkQIMnMRbhOetNVVNALXqbOQWclgamM2gii0cRxlRpxGWrlMc/VLDnWimf2T2uipQteFN8UXtV2ZsSJUWvcaVFNDo85p7uFVTx71Qg0ULie6iSZkyorSOVY5aq2NMzbPvuFbSnP3oonQrPp/w3P/AHT2/wAWE7yc0rqf5QuO9Sto3Nswi4wHksP9wLW/7t1doZhkBZSXJxPUfpyJ/BWDQxwTi2RHGiQx3a+qdMRzr6IRzZLmwpiNFnxW3HH7KPdDoyV4vabS4+qGzSEWmmLLASPcrh/TeyfB2jFwxZr3R/Se00eBC7lh2Ee9Vzj8TOjN3GZjj5XjddpvNq3xE/4oR1dDk25Nr8nxETkoGTdU0Qbx7sjaVR2EKdhosFpqZiPPSmfojxIjis5CAYxgkym4xEQLqsPDIqQBQGuY1rmZQOv70TDwa+jdg+I6JgD5iKwDBEGfm+aZsAc19EzYMENI+G2kTLQ4kSRJJrMg21Seh8Ddw2jUgnvbvkf4ho8UWzdINdivZH5AZykdpw8zXUJAeX0r0aMJ7XNBOGXRAqWkVisyIEiZsQbLEWQ2YBkXNaGlM8jXWYXqY/SjcVj2lglgDhJ+ZocA48DU+K83D2mMMshlXTYkm4ufluIi9Jsrg0uzKafgwtvVG9ugrMg05xx71HgiZFRIVCM1UpJ8DSICWiDmft5V8kTOXH9eSPCeLloIGU38Qj3QZAO6L8OUZEwAlcqKVA/FMRKLDdaffkkhhbkY1RtfwQWjWx1OKiQ4zZRA7MoEDWR4V53p5oCYyg35jL9+KMKxhKEuSGBhtJK0YjSFWHROxn0W6hwYtisHHLXBwo5pDgdHAyD4gLu3Q3SLdowMPGb+dtRo4Uc3uMhcELySNAvvPwy6c3Xu2Zx7LiXs/qA7Te8CRxB1WEkeH1DB+pj3Ltfx5OjvoRqiLybZhBjhRrq/RZ+TjRSop7gY8ImqrDcZ40BH0RYmECZ1996j2CQYr7qkbJqqLYz3wWPrB0UNowH4RoSJaf4XCrT3GO6VvzTMPPXP36poN7i1JeDgO27M5hcx7S1zTuuaciMuWhzkLGHLqv4gdXDiNG0YQPxGDtAXc0VBEfmblmRyC5c5oiQJp5nkrTs+gwZllimvyAJJpJKItkCnuErcNU3BOuWUwg9AbTSFYZvENAqaVNCTQECKX4oHGptI4itQKHNb+jWS9tIIrnWAXA8qBMZ7oMMeRbceR/cSG/7SAvI6v7M4nExHA0BZX+JwO94eq9l47LtC7DZ5g/8ALyTHUZjcHj/iEhUfMY+ylmK+nZLHuzggsJidJpdJe9oaQ0hwkGrYJ1BIANOBjtQM19NtoDm82HyJXyLsGPurinXBDSvkAOHcraRImuqtrIitb8oshkk1M8SiK5pgxu5SRwRtbQE52r3dyW4kCPDz996Fj6ibSLaZxxWkpJKhJG8YkUv7olEVSdoe0PO5vbtI34DrC4Huyv4wAostxomHiQL0UWM4pJJlWix2NJV74gRfP34prWM3N/eG9vRuVtrKViMBiKJAV8SCmOxAaRKThOANZFakXAsYEiaE5hE3EtwoPqrUmZOKYBaamEWz47mPa9phzCHNOhBkFW40PFKtlX78OShsbiuju/QnSjdowGYzYqO0P4XCjm9x8QQtbXaii5R1F6e/6fG3XkjCxYBkQ1rhQP0FaGljU0XVna+/1Wb4OBqNP+lNrx4HwffqluJ8fLKOCvDxYTXMkSEdnm+18iW0j33cE5rq0p6oWiRX2cyoWlp9+aRTp8GhzQQuddc+pbi92Ps7QZlzsMUM5uYLE5lutqmF0BmJxCaXa1/VUn5Kw5p4JWj88OINIIidb2r4aBA4Qfouy9ZepuDtMvb/AKeMalwHZeRYPbnzFea5Z0v0VjbM7cx2EH8rrtcGj8rgK5cRNYVnb0+rx5lSdP2PKA4L1uhWVeRYNgHia34R5rERNQDWg8O0PMdxXo9EtIY+c3eTQ0iP8yg9Z6+K/sD/AMo8j+gTsUdjHGkH6H7LPtB/02n+cHxqtjHf6j2Gz2SOJbRw8PooKMe0/wD5uOjHR3s3h6r5ljZz5xPgvqcD5Q11Yljh4x5SO9eFtWyuwngGrfyui/MjP2FtjlSZnJHl45rCXvUt310qPoU/amkPkahwI41ytHkgDeGRuolK2NKhLnWGnio5sQvQ2rox+Exj3jd+ITuh1HFou8NuGzSTE5TdYnn3OaQ001aBLqQPfeh1Ua6PWDcaKnFAwZUQuKiBWbGJuG4V3pNDEGIOROo4JWHb6q4VFLlFAIntgkSDGYIIPIi6F7fYVTSyQmqDLvygzXQcBMmvcaIHt+3hTJW3gaU5TH7hNDZQw22IMRxy0jkuidSOtchuz4xA/LhuMxwwycj/AAnOIvf4PHLXOlrQ0QOzM2ABMm8mqB+Hm0U/byUtWYZsMckaZ3lrSK3Ga04b18D1V65Ds4O0GDYYhIh3B5sP6rHODU/dNIFioqjg58UoSqSHDUWRyCEDTbTP3omSFSPK7Rn3YRMdxpdNcJ9+6LOXAeP0uk+DWL3I1NtI08krbdjw8ZhZisa9pycJ5EHI8QlMxSPqtDMYGmaqMkROE48o+D6S/Dhu8TgYm6013H1g1iHZiudeJXz209CbRswa3GYAXOdDhBa6jSKixO7EXXYQ4arB03sTcbBew/NBLDm1wq0jvVvbVo9em1+ZSUZ8o5bhN38NzRe44x7b4ovi7zWuHzsM8nC4PAj1SsB8Pa7J8dx+xn66JxYGYn8r6EfzDP6+ahn0SLxi0j4goHfNw/Y/QoMdoewsfpI15jiPvqVeBZ7DkSY4G/8AyWZmIQ2vzYboPFtv0TGN6K6j7VitDw7DYw2c51xMSGtBpzIX1uy9W9j6Pwzj45+I9ti4dneyDGak2Jk8kPV7rFg4GzP+M4Dcd2RTedvZNH5rLn/WfrLibZibzjusaey0WaNTq7j3JdnLrPlyuD4in/kR090w/asd+M4QTRon5WizQfGTqSvJeRlZU4jK2WvNC73RM6KSSSXSIHeyq3lRPBVT6/ogZCoqhRMRpY5PYJCziDXlAvwR72iLKQ1wkQL1991VAw6RNuU3BPKJ5qoi9xlmmjEMSDHcb1AFsxKBsBmHxV2KpuMFPii4BBGeuXd+qGAYYTMC2f6pjBFMkgEix98NVbXL0RiqMXJ2MfhyJpRfQdWOtr9mLWYsvwBSlSyay2fpalIz8KdLVvc0qiLARYxkVlKAThHJHbJHb9i21mIxuJhvD2HMWpkRkRmCtO9M8q8rDvXD+jOk8fZXzgvDd6N5rpLXDIvFu8VX3PRP4iYDwBjtdhO1ALmHjI7Q7weaxcWjj59BOLuKtf7Psd4ya29hKc/3xTNl2jDxWhzHNc2kOaQ4eIz5on4BvfiFDR500nT4YnfHLNEMaDyQnDV/Cju9+KXJt9HkczFn9U3BdWpWJwcLDXzRMxC0bzhAAJ5cU0yXjX7TkmI6WHg4eFf/AKW7aXyGO1c0+N15wd2HDgD5tHotjHSxn9vp91oz6CPQ1rox3jJw9R/9FII7bgfzNjy3fGRKvaXxiMd3eI3fWe5XtQh7XcY7jbzlIo8fphs4bHaRpMEBp82t8V4rXRlOVfRe90qzsOGgMf5B30aV4bWFzqQJrSw4KhVbKpSuk0t90tyc7BGRlWcAxlGvh7pxRY9svYzkqDmo4KimSW45KISogRoLpkmp8IreB9OKhcoXW4fRGCM+7nx4IQwQUW/x4d1PsFC4e/t4otq2RzILhRwJadRxGRsY4psCiZECIH1POpOVKURtaSHAU+WZdAjiMxMHhxuhwBmBIETfOTHKhTx+UxNjJqAZoI1hpoYnzSABxEXUw5JgCeFZOtqpeKCa0JqSYg3N8iTP0V4O0vY7eB7UXEGhFZ0Meq23me0aHCuWUZ5+U/VMwscjPUX8ad6yMx4JdWawRESQaEERFfCkKiYDTuuFpJNHcqU81DnZSVG7HImPp9QlPeBIgXHG0zHO6ybzomKTEoX0ScirNuBtRYd5jnsdqxzmnxBXr4PWrbWRu7S88HQ//wBgV86ReZ0GhIIkTyM+GqprhnOVjxrzok6ZDhGX3JM+2wPxE2psbzMJ8cHAnvBjyW5n4nkfNsonhiR5FvqueNrQcT4AkqSp2oyekwv9p0F/4mzbZvHF9Ayqy7R13xMcOZDWS2gALiaOLmlxMDKDGq+Jfhkcij2N4a4TmC0kCSJESBnF0tqKjpscXaiezgvo/wDob/uc530hehgfIP7T9PsvPeWEP+FvEgMbBuQGtG8BAN5B7ins2pofuSN4SI/KTLobM0uPomzdDttBLZGnqU7aSHsa8ZifDtD6OXkv2t7Qyd3MOgTAmM7/AJrTZelg4o3AwwDLQAKAy0SWTcVKVBZm2xkyNTHc4bp/9ivncBoiTdfQuxGyd5wDr9qAKGJE3sdZpHDw6VgUMxOk070xx7spgTHGiTMHKKny1RsMpM3xy5AxG5ihyjX3Kzka8VtcEAwwTBMJJhkxp8oxKInNhWrPNQx0TmBFM6x91B+/Gvl+irEUQBVlq3z2TM7thMxYyIt3ZhYytJ9E0AOI0QIB0Ok/stG45lDIm41jWEGGmv8AyclUV9Qn0I2nEocibxnWYIsBwGgSsdjm7u8LtBbUGhJi3fRXi+hWYIn2SujQXGIkR8wE0FzAEwDwulNKEo9OXqVBQcwo10yEJQIYDTMmpret866qNaCR5+qFMbkgAXtINFRdULU35RzHql7ShlFuxAR792Sm0MoRly+6jboGamY1eJ1ql7omh9/ZGPQ+qKL/ANPohCZKkEzJFNZVMfukO0MqsC6XjLWPRm+wn4pfeKCABkLgBCo35UWz3HcokXEW5Fv5KY9zzP1SioLTo1sISsRULIXWSNd7oQ8q0L7qKjBn/9k=",
//     imageAlt: "ghost tour picture",
//   },
// ];



export default function Excursion() {
  const { loading, data } = useQuery(QUERY_EXCURSIONS);
  const excursion = data?.excursions || [];
  console.log("data ", data)
  console.log("dining", excursion)

  return (

    // <div className="bg-gradient-to-r from-fuchsia-600 via-blue-700 to-green-500 bg">
    // IMG 1
    // https://images.unsplash.com/photo-1623603807271-21a9cbb295bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2FsYWN0aWN8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60
    
    <div className="bg-[url('https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616__480.jpg')] bg-contain">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Excursions</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 text-white">
          {excursion.map((excursion) => (
            <div className="border-4 rounded-md border-blue-100 text-white">
              {/* <div className="bg-white-500 rounded-md"> */}
                <a key={excursion._id} href={excursion.href} className="group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-blue-200 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={excursion.imageSrc}
                      alt={excursion.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                </a>
                <div className="bg-blue-100">
                <h3 className=" text-center underline text-3xl text-black ">
                  {excursion.excursion}
                </h3>
                <p className="mt-1  text-center text-lg font-medium text-black">
                  {excursion.description}
                </p>
                <p className="mt-3 text-center text-xl font-lg  text-black">
                  {excursion.cost}
                </p>
                <a
              href="#"
              className="mt-3 mb-4 ml-16 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Click to Add
            </a>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
