import React, { useState,Component, useEffect } from 'react';
import './Home.css'
import bggw from '../../Assets/newbggw.png'
import $ from "jquery";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import moment from 'moment';
import Typewriter from 'typewriter-effect';

import "react-datepicker/dist/react-datepicker.css";

export default function Home(){
    const [startDate, setStartDate] = useState(new Date());
    

    const [page,setPage]= useState(1)
    const [nama, setNama] = useState('')
    const [jam,setJam] = useState(0)
    const [kemana,setKemana] = useState('')
    const [makan,setMakan] = useState('')
    const [isPacar,setIsPacar] = useState('')
    const [finalResult,setFinalResult] = useState('') 

    const pacar=(value)=>{
        console.log(value)
        if(value === 'gaboleh jawab udah'){
            console.log('true')
            setIsPacar('')
        }else {
            setIsPacar(value)
        }
    }
    const start_game=(id)=>{
        if(page == 1){
            var nama = $('.nama_pilihan').val()
            console.log(nama)
            setNama(nama)
            // alert(nama)
            if(nama.length <0  || nama === ''){
                Swal.fire({
                    icon: 'error',
                    title: 'Nama Kamu Siapa ?',
                    text: 'Silakan Coba Lagi'
                  })
            }else {
                var nama_cap = nama.toUpperCase()
                if(nama_cap == 'ADELLA' || nama_cap == 'ADELA' || nama_cap == 'NCI' || nama_cap == 'ADEL'){
                    setPage(id)
                    setNama(nama)
                    Swal.fire(
                        'YEAY!!',
                        `Hallo ${nama}!!`,
                        'success'
                      )
                }else {
                    // alert('maaf, aplikasi ini hanya untuk acid')
                    Swal.fire({
                        icon: 'error',
                        title: 'Sorry, this apps only for adel',
                        text: 'Try again'
                      })
                }

            }

        }else if (page === 2 ){
            // alert('masuk ke page 2')
            // alert(nama)
            if(jam === undefined || jam === 0 || kemana === undefined || kemana === ''  || makan === undefined || makan === '' ){
                Swal.fire({
                    icon: 'error',
                    title: 'isi dulu, biar bayu gak bingung',
                    text: 'Silakan Coba Lagi ya'
                  })
            }else {
                setPage(id)
                // alert(nama)
                // var res = `Hallo bayu, jadi ${nama}, bisa pergi jam ${jam} ke ${kemana},  mau makan ${makan} aja. `
                // var uri_res = encodeURIComponent(res);
                // setFinalResult(uri_res)
                // console.log(uri_res)
                // console.log(jam,kemana,makan,startDate)
            }
        }
        else {
            setPage(id)
        }




        // alert(nama)
    }

    const bubar=()=>{
        // alert('jalan')
        window.open('','_parent','');
        window.close();
        // window.close();
    }

    useEffect(()=>{
        if(page == 1){
            setPage(1)
        }else if ( page == 2 ){
            setPage(2)
        }else if ( page == 3 ){
            setPage(3)
            var res = `Hallo bayu, aku ${nama}, aku bisa pergi jam ${jam} ke ${kemana},  mau makan ${makan} aja. `
                var uri_res = encodeURIComponent(res);
                setFinalResult(uri_res)
                console.log(uri_res)
                console.log(jam,kemana,makan,startDate)
        }
    })

    const onChangeNama=(nama)=>{
        console.log(nama)
        setNama(nama)
    }
    return (
        <>
            <div className="box-home">

                {
                    page ===1 ? 
                <div className="option-1-hello-container">
                    <Typewriter
                            options={{
                                strings: ['Hello!'],
                                autoStart: true,
                                loop: true,
                                delay:75
                            }}
                            className="type-header"
                    /> 
                    <br/> 
                    <div className="option-1-hello-question">
                        <input type="text" className="nama_pilihan" placeholder=" Nama Kamu" onChange={(e)=>onChangeNama(e.target.value)}/>
                        <div className="option-1-button" onClick={()=>start_game(2)}>
                            START
                        </div>
                    </div>
                </div>
                :
                    page === 2 ?


                <div className="option-1-hello-container">
                    {/* <p id="opt-2-name">Hi  <span>{nama}!!</span></p> */}
                    <p id="opt-2-name">
                        <Typewriter
                                options={{
                                    strings: [`Hi, ${nama}`],
                                    autoStart: true,
                                    loop: true,
                                    delay:75
                                }}
                                className="type-header"
                        />
                    </p>
                    <div className="option-1-hello-question">
                        <DatePicker className="datepicker-acid" selected={startDate} minDate={new Date()} onChange={(date) => setStartDate(date)} />
                        <input type="number" placeholder="Jam Berapa Bisa Pergi ?" className="input-acid" onChange={(e)=>setJam(e.target.value)} />
                        <input type="text" placeholder="Maunya Pergi Kemana?" className="input-acid" onChange={(e)=>setKemana(e.target.value)}/>
                        <input type="text" placeholder="Sukanya Makan Apa?"className="input-acid" onChange={(e)=>setMakan(e.target.value)}/>
                        {/* <input type="text" placeholder="kalo minum, air putih aja sehat"className="input-acid"  disabled/> */}
                    </div>
                    <div className="option-1-button" onClick={()=>start_game(3)}>
                        Last Question
                    </div>
                </div>
                :
                <div className="option-3-hello-container">

                    <div className="last-question">
                        <p>Udah Punya Pacar Belum??</p>
                        <select className="form-select form-select-sm"   aria-label=".form-select-sm example"
                        onChange={e =>pacar(e.target.value)} 
                        >
                            <option selected>gaboleh jawab udah</option>
                            <option value="UDAH">UDAH</option>
                            <option value="BELUM">BELUM</option>
                        </select>
                    </div>
                    
                    {

                        isPacar == ''?
                        <p></p>
                        :
                        isPacar  === 'UDAH'?
                        <>
                        <div className="udh-pacar">
                            <p>ku kecewa udah ada pacar,</p>
                            <p>kalo udah putus kabarin!</p>
                        </div>
                        <div className="btn-closetab" onClick={bubar}>
                        <a href="https://www.google.com/search?q=mengsedih" target="_blank" > BUBAR BUBAR!</a>

                            
                        </div>
                        </>
                        :
                        
                        <>
                            <div className="result">
                                <p>jadi, {nama} bisa pergi jam {jam} <br/> ke {kemana}<br/>  mau makan {makan}</p>
                            </div>

                            <div className="box-button-final">
                                <div className="option-3-button" onClick={()=>start_game(2)}>
                                    Ganti Jawaban
                                </div>
                                <div className="option-3-button" onClick={()=>start_game(4)}>
                                    <a href={`https://wa.me/6287785192296/?text=${finalResult}`} target={'_blank'}>YUK JALAN!</a>
                                </div>

                            </div>
                        </>
                    }

                </div>

                }
            </div>

        </>
    )
}