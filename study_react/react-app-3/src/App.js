import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
    const [funcShow, setFuncShow] = useState(true);
    const [classShow, setClassShow] = useState(true);
    return (
        <div className="container">
            <h1>Hello world</h1>
            <input
                type="button"
                value="remove func"
                onClick={() => {
                    setFuncShow(false);
                }}
            />
            <input
                type="button"
                value="remove class"
                onClick={() => {
                    setClassShow(false);
                }}
            />
            {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
            {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
        </div>
    );
}
const funcStyle = "color:blue";
let funcId = 0;

function FuncComp(props) {
    const [number, setNumber] = useState(props.initNumber);
    const [_date, setDate] = useState(new Date().toString());

    // useEffect는 랜더링 후, 랜더링 될때마다 실행(componentDidMount, componentDidUpdate와 동일격)
    // useEffect(이펙트 함수, []); -> 빈 배열을 넣으면 useEffect 최초 1회만 실행 (= componentDidMount), 빈 배열일때의 return값은 componentWillUnmount가 됨
    // 만약 useEffect(이펙트 함수, [_date]) 이렇게 할 경우 _date값이 변경될 때만 실행됨. []는 배열이므로 state 값이 여러개가 들어갈 수 있음.
    useEffect(() => {
        console.log(`%cfunc => useEffect (componentDidMount & componentDidUpdate) ${++funcId}`, funcStyle);

        // crean up
        // 컴포넌트가 화면에서 사라질때(언마운트) 새로운 effect 실행 전에 이전 effect를 깨끗하게 정리함
        // 즉 값이 변경돼서 effect가 실행되기 전에 return함수가 먼저 실행된 후 effect가 실행됨.
        return function () {
            console.log(`%cfunc => useEffect return ${++funcId}`, funcStyle);
        };
    });
    console.log(`%cfunc => render ${++funcId}`, funcStyle);

    return (
        <div className="container">
            <h2>function style component</h2>
            <p>Number : {number}</p>
            <p>Date : {_date}</p>
            <input
                type="button"
                value="random"
                onClick={() => {
                    setNumber(Math.random());
                }}
            />
            <input
                type="button"
                value="date"
                onClick={() => {
                    setDate(new Date().toString());
                }}
            />
        </div>
    );
}

const classStyle = "color:red";
class ClassComp extends React.Component {
    state = {
        number: this.props.initNumber,
        date: new Date().toString(),
    };
    // 데이터 준비(초기화)
    constructor(props) {
        super(props);
        console.log("%cclass => constructor", classStyle);
    }
    // DOM 접근
    componentDidMount() {
        console.log("%cclass => componentDidMount", classStyle);
    }
    // props 또는 state 변경 시 호출. 랜더링 전 실행되며 true를 반환하면 render() 실행
    shouldComponentUpdate(nextProps, nextState) {
        console.log("%cclass => shouldComponentUpdate", classStyle);
        return true;
    }
    // 랜더 직전 props, state 변경에 따라 업데이트할때 호출
    static getDerivedStateFromProps(nextProps, nextState) {
        console.log("%cclass => getDerivedStateFromProps", classStyle);
        return null;
    }
    // 랜더 직후 호출
    componentDidUpdate(nextProps, nextState) {
        console.log("%cclass => componentDidUpdate", classStyle);
    }
    // 컴포넌트가 사라지기 직전 호출 (== crean up)
    componentWillUnmount() {
        console.log("%cclass => componentWillUnmount", classStyle);
    }
    render() {
        console.log("%cclass => render", classStyle);
        return (
            <div className="container">
                <h2>class style component</h2>
                <p>Number : {this.state.number}</p>
                <p>Date : {this.state.date}</p>
                <input
                    type="button"
                    value="random"
                    onClick={function () {
                        this.setState({ number: Math.random() });
                    }.bind(this)}
                />
                <input
                    type="button"
                    value="date"
                    onClick={function () {
                        this.setState({ date: new Date().toString() });
                    }.bind(this)}
                />
            </div>
        );
    }
}

export default App;
