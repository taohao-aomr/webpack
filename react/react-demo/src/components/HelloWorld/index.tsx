import React, { useEffect, useState } from 'react';
import * as styles from './index.less';

/**
 *
 *  - 实现一个计时器组件
        - 页面展示从开始计时到当下多少秒。从零开始计时，每秒更新一次 0, 1, 2, 3, 4, ……
        - 添加三个 button 控制计时器的启动，暂停和清空
        - 添加第四个 button 进行存储，每次点击存储当前计数，最多存储并展示最近的五条记录
 */


const HelloWorld = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleClear = () => {
        setSeconds(0);
        setIsRunning(false);
    };

    const handleSet = () => {
        const newHistory = [...history, seconds];
        if (newHistory.length > 5) {
            newHistory.shift(); // Remove the oldest entry  
        }
        setHistory(newHistory);
    };

    return (
        <div>
            <p>{seconds}</p>

            <button onClick={handleStart}>启动</button>
            <button onClick={handleStop}>暂停</button>
            <button onClick={handleClear}>清空</button>
            <button onClick={handleSet}>存储</button>
            {history.map(v => <div key={v}>{v}</div>)
            }
        </div>
    )
}
export default HelloWorld