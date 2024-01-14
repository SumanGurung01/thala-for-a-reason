import React, { useRef, useState } from 'react';
import moyemoyeImage from './assets/moyemoye.gif';
import thalaImage from './assets/thala.gif';
import { FaWhatsapp } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

function App() {
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [image, setImage] = useState();

    const [thalaAudio, setThalaAudio] = useState(
        new Audio(require('./assets/thala.mp3'))
    );
    const [moyemoyeAudio, setMoyeMoyeAudio] = useState(
        new Audio(require('./assets/moyemoye.mp3'))
    );

    // play in loop
    thalaAudio.loop = true;
    moyemoyeAudio.loop = true;

    // play audio from start after each render
    thalaAudio.currentTime = 0;
    moyemoyeAudio.currentTime = 0;

    const inputRef = useRef();

    function sumOfDigit(num) {
        if (num === 0) return 0;
        var sum = 0;

        while (num > 0) {
            var remainder = num % 10;
            var num = Math.floor(num / 10);
            sum += remainder;
        }

        return sum;
    }

    function checkForReason(e) {
        e.preventDefault();

        // first stop all audio
        thalaAudio.pause();
        moyemoyeAudio.pause();

        var input = inputRef.current.value;

        input = input
            .split('')
            .filter((value) => value !== ' ')
            .join('');

        // no matter show image
        setShow(true);

        // if input is string
        if (isNaN(input)) {
            if (input.length === 7) {
                setValue(input.split('').join('+'));
                setImage(thalaImage);
                thalaAudio.play();
            } else {
                setValue('Not Thala for a Reason');
                setImage(moyemoyeImage);
                moyemoyeAudio.play();
            }
            inputRef.current.value = '';
            return;
        }

        // if input is number
        if (sumOfDigit(Number(input)) === 7) {
            setValue(input.split('').join('+'));
            setImage(thalaImage);
            thalaAudio.play();
        } else {
            setValue('Not Thala for a Reason');
            setImage(moyemoyeImage);
            moyemoyeAudio.play();
        }

        inputRef.current.value = '';
        return;
    }

    const handleShare = () => {
        // Replace 'your-website-url' with your actual website URL
        const websiteUrl = encodeURIComponent(
            'https://thala-for-a-reason-six-ruddy.vercel.app/'
        );
        const whatsappShareLink = `https://wa.me/?text=${websiteUrl}`;
        window.open(whatsappShareLink, '_blank');
    };

    return (
        <div className="flex justify-center items-center md:my-6">
            <div className="w-full max-w-[600px] shadow-md p-5 m-6 flex-col flex justify-center items-center">
                <p className="font-semibold text-4xl text-center my-6 text-zinc-300">
                    Everything has a reason. check if it is{' '}
                    <span className="text-blue-500">Thala</span>
                </p>
                <form onSubmit={checkForReason} className="w-full">
                    <input
                        className="text-xl bg-zinc-900 w-full p-3 outline-none rounded-lg text-zinc-300"
                        placeholder="Check if it is thala"
                        ref={inputRef}
                    ></input>
                </form>
                {show ? (
                    <>
                        <p className="text-zinc-300 text-center font-semibold text-xl my-6">
                            {value === 'Not Thala for a Reason'
                                ? value
                                : `${value} = 7 , Thala for a reason`}
                        </p>
                        <img
                            src={image}
                            className="w-[300px] h-[300px] object-cover"
                        ></img>
                    </>
                ) : null}

                <p className="text-center my-6 text-blue-500">
                    #ThalaForAReason
                </p>
                <div className="flex gap-5">
                    <FaWhatsapp
                        size={28}
                        className="text-green-500 cursor-pointer"
                        onClick={handleShare}
                    />
                    <a
                        href="https://github.com/SumanGurung01/thala-for-a-reason.git"
                        target="_blank"
                    >
                        <FaGithub
                            size={24}
                            className="text-zinc-300 cursor-pointer"
                        />
                    </a>
                </div>
                <p className="text-sm text-zinc-400 my-10">
                    Developed by Suman Gurung ✌️. Just for fun
                </p>
            </div>
        </div>
    );
}

export default App;
