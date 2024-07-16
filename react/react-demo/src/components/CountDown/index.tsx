
import React, { useState, useEffect } from "react";

type Props = {
    time: Number
}


const CountDown = ({ time }: Props) => {

    const [timer, setTimer] = useState(null);
    const [curTime, setCurTime] = useState<Number>(time)

    const formatZero = (num: number) => {
        return num > 10 ? num : `0${num}`
    }

    const formatTime = (t: number, format: string = 'hh-mm-ss') => {
        if (!t)  { return '00:00:00'}
        let h = Math.floor(t / 60 / 60);
        let m = Math.floor(t / 60 - 60);
        let s = t % 60;

        h = formatZero(h);
        s = formatZero(s);

        let str = format.replace('hh', `${h}`).replace('mm', `${m}`).replace('ss', `${s}`)

        return str
    }

    useEffect(() => {
        if (curTime == 0) {
            clearInterval(timer)
        }
        setTimer(setInterval(() => {
            setCurTime((pre) => pre - 1)
        }, 1000));
      return () => {
        clearInterval(timer)
      }
    }, [])

    return (
        <div>{formatTime(curTime)}</div>
    )

}

export default CountDown;