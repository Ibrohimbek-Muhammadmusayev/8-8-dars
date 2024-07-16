import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState, FormEvent } from "react";
export default function Login(){
    const [error, setError] = useState('')
    const [user, setUser] = useState<{email: string, password:string}>({
        email: '',
        password: '',
    });

    const hendleSubmit = (e:FormEvent) => {
        // const email = '';
        // const password = '';
        e.preventDefault();
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            // Signed in 
            const users:any = userCredential.user;
            window.sessionStorage.setItem('token', JSON.stringify(users));
            users && window.location.replace('/');
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
        });
    }

    return (
        <div className="w-[320px] card h-[500px] flex items-center justify-center mx-auto">
            <form onSubmit={hendleSubmit} className="w-[300px]">
                <div className="flex flex-col text-center gap-[10px]">
                    <h1 className="font-bold text-[30px] text-white pl-[40px] pr-[40px] mb-[20px]">Login Admin</h1>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} type="text" className="grow" placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                        </svg>
                        <input value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="*********" type="password" className="grow"/>
                    </label>
                    {error ? <p className="text-red-500">Email yoki parol notogri qayta urinib iltimos koring!</p> : '' }
                    <button className="btn w-full mt-[10px]" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
} 