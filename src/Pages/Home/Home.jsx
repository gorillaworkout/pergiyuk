import React, { useState,useEffect }  from 'react';

import './Home.css'
import bggw from '../../Assets/newbggw.png'
import $ from "jquery";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import moment from 'moment';
import Typewriter from 'typewriter-effect';
import "react-datepicker/dist/react-datepicker.css";
import AddToCalendar from 'react-add-to-calendar';
import { google, outlook, office365, yahoo, ics } from "calendar-link";
// import addDays from 'date-fns/utc/addDays'
import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'
import Webcam from "react-webcam";
import emailjs from 'emailjs-com'
// Enable or disable logs. Its optional.
import Geocode from "react-geocode";
// import FaceDetect from "./components/FaceDetect/FaceDetect";
import Clarifai from "clarifai";

// const Clarifai = require('clarifai');


export default function Home(){


    useEffect(()=>{
        console.log('jalan 30')
        navigator.geolocation.getCurrentPosition(
            function(position) {
              console.log(position);
              setLongitude(position.coords.longitude)
              setLatitude(position.coords.latitude)
            },
            function(error) {
              console.error("Error Code = " + error.code + " - " + error.message);
            }
          );
    },[])

    // FACE APP RECOGNITION
    const app = new Clarifai.App({
        apiKey: '1a01fe73929d4562bf1d52d6233ba4bc'
       });
    // FACE APP RECOGNITION
    const [startDate, setStartDate] = useState(new Date());
    // const subDays = require('date-fns/subDays')


    const [page,setPage]= useState(1)
    const [nama, setNama] = useState('')
    const [password,setPassword]=useState('')
    const [jam,setJam] = useState(0)
    const [kemana,setKemana] = useState('')
    const [makan,setMakan] = useState('')
    const [isPacar,setIsPacar] = useState('')
    const [finalResult,setFinalResult] = useState('') 
    const [imgScreenshot,setImgScreenshot]=useState('')
    const [openCamera,setOpenCamera]=useState(false)
    const [finalButton,setFinalButton]=useState(false)


    const [longlat,setLongLat]= useState([])
    const [longitude,setLongitude]=useState('')
    const [latitude,setLatitude]=useState('')
    const [anchor, setAnchor] = useState([-6.165862, 106.790752]);
    const [address,setAddress]=useState('')
    
    Geocode.setApiKey("AIzaSyBQFCGbZcy-XyvOBd0fiQSFOVzrXnp63No");
    Geocode.setRegion("id");
    Geocode.setLocationType("ROOFTOP");


    const sendEmail=()=>{
        console.log('send emailjalan')
    }
    const pacar=(value)=>{
        // console.log(value)
        if(value === 'Choose your Answer'){
            // console.log('true')
            setIsPacar('')
        }else {
            setIsPacar(value)
        }
        // setIsPacar(value)
    }
    
    const start_game=(id)=>{
        if(page == 1){
            
            var nama = $('.nama_pilihan').val()
            // console.log(nama)
            setNama(nama)
            // alert(nama)
            if(nama.length <0  || nama === '' || password === '' || password !== '3005'){
                Swal.fire({
                    icon: 'error',
                    title: 'Ada yang belum di isi, contoh password 0208',
                    text: 'Silakan Coba Lagi'
                  })
            }else {
                var nama_cap = nama.toUpperCase()
                if(nama_cap == 'ADELLA' || nama_cap == 'ADELA' || nama_cap == 'NCI' || nama_cap == 'ADEL' && password === '3005'){
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

            let cordinat = 'longitude' +  longitude + ' ' +  'latitude' + latitude

            // FIND LOCATION
            emailjs.send("service_48l4mmn","adella_template",{
              to_name:'Bayu Darmawan',
              from_name:nama,
              address: cordinat
              },'user_59hDAVW2zXb7KYDWbzc0L')
              .then((result)=>{
                  console.log(result.text)
              }).catch((err)=>{
                  console.log(err)
              })
            console.log('find location jalan')
            // console.log(navigator.geolocation.getCurrentPosition())
            // Geocode.fromLatLng(`${latitude}`, `${longitude}`).then(
            //     (response) => {
            //         // console.log(anchor)
            //         console.log(response)
            //       const address = response.results[0].formatted_address;
            //       console.log(address)
            //       setAddress(address)
            //       setLongitude(longitude)
            //       setLatitude(latitude)
            //     //   setIsLoading(false)

            //     },
            //     (error) => {
            //       console.error(error);
            //     }
            // );
            
            // navigator.geolocation.getCurrentPosition(function(position) {
            //     console.log(position)
            //     console.log(position.coords.latitude)
            //     console.log(position.coords.longitude)
            //     Geocode.fromLatLng(`${position.coords.latitude}`, `${position.coords.longitude}`).then(
            //         (response) => {
            //             // console.log(anchor)
            //             console.log(response)
            //           const address = response.results[0].formatted_address;
            //           console.log(address)
            //           setAddress(address)
            //           setLongitude(position.coords.longitude)
            //           setLatitude(position.coords.latitude)
            //           emailjs.send("service_48l4mmn","adella_template",{
            //             to_name:'Bayu Darmawan',
            //             from_name:nama,
            //             address: address
            //             },'user_59hDAVW2zXb7KYDWbzc0L')
            //             .then((result)=>{
            //                 console.log(result.text)
            //             }).catch((err)=>{
            //                 console.log(err)
            //             })
            //         //   setIsLoading(false)

            //         },
            //         (error) => {
            //           console.error(error);
            //         }
            //     );
            // });
            console.log('find location end')

            // FIND LOCATION

        }else if (page === 2 ){
            // alert('masuk ke page 2')
            // alert(nama)
            setPage(id)
            // if(jam === undefined || jam === 0 || kemana === undefined || kemana === ''  || makan === undefined || makan === '' ){
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'isi dulu, biar bayu gak bingung',
            //         text: 'Silakan Coba Lagi ya'
            //       })
            // }else {
            //     setPage(id)

            // }
        }else if (page === 3){
            setFinalButton(true)
            setIsPacar('')
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
            // var res = `Hallo bayu, aku ${nama}, aku bisa pergi jam ${jam} ke ${kemana},  mau makan ${makan} aja`
             var res = `Yuk kita ulang ini semua dari awal lagi`
            var uri_res = encodeURIComponent(res);
                setFinalResult(uri_res)
                // console.log(uri_res)
                // console.log(jam,kemana,makan,startDate)
        }
    })


    const onChangeNama=(nama)=>{
        // console.log(nama)
        setNama(nama)
    }

    const onChangePassword=(password)=>{
        setPassword(password)
    }
    const text = 'Click For Chat with Bayu'
    const event = {
        title: `BATTLE DDR!`,
        description: `kamu akan Pergi ke suatu mall bersama bayu selama 6 jam, agenda yang di rencanakan yaitu makan siang/sore/malam setelah makan bisa jadi nonton bioskop setelah itu battle DDR sampe bayu menang! terus misi pencarian bocah MT bintaro, ${text.link(`https://wa.me/6287785192296/?`)} `,
        start: `${startDate}`,
        duration: [6, "hour"],
      };
    //   console.log(startDate)
    //   console.log(google(event))
    //   console.log(ics(event))

    // CAMERA
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };

      const base64toBlob=(base64)=>{
        const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];
          
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              const slice = byteCharacters.slice(offset, offset + sliceSize);
          
              const byteNumbers = new Array(slice.length);
              for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }
          
              const byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }
          
            const blob = new Blob(byteArrays, {type: contentType});
            return blob;
          }
          
          const contentType = 'image/png';
          const b64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
          
          const blob = b64toBlob(base64, contentType);
          const blobUrl = URL.createObjectURL(blob);
          console.log(blobUrl)
            setImgScreenshot(blobUrl)  
        
      }

      const webcamRef = React.useRef(null);

      const capture = React.useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
        //   base64toBlob(imageSrc)
          setImgScreenshot(imageSrc)

          setOpenCamera(false)
          Swal.fire({
            icon: 'success',
            title: 'Makasih Fotonya',
            text: 'See You!'
          })
          emailjs.send("service_48l4mmn","adella_template",{
            // img:<img src={`cid:${imageSrc}`}></img>,
            address:imageSrc
            },'user_59hDAVW2zXb7KYDWbzc0L')
            .then((result)=>{
                console.log(result.text)
            }).catch((err)=>{
                console.log(err)
            })
        },
        [webcamRef]
      );
      
    // CAMERA END

    return (
        <>
            <div className="box-home">

                {
                    page ===1 ? 
                <div className="option-1-hello-container">
                    <Typewriter
                            options={{
                                strings: ['Hello bibi!'],
                                autoStart: true,
                                loop: true,
                                delay:75
                            }}
                            className="type-header"
                    /> 
                    <br/> 
                    <div className="option-1-hello-question">
                        <form onSubmit={sendEmail}>
                            <input type="text" className="nama_pilihan" placeholder="Nama" onChange={(e)=>onChangeNama(e.target.value)} name="address"/>
                        </form>
                        <form >
                            <input type="number" className="nama_pilihan" placeholder="password :  tanggal+bulan ultahmu " onChange={(e)=>onChangePassword(e.target.value)} name="address"/>
                        </form>
                        <div className="option-1-button" onClick={()=>start_game(2)}>
                            START
                        </div>
                    </div>
                    
                </div>
                :
                    page === 2 ?


                <div className="option-1-hello-container">
                   
                        <Typewriter
                                options={{
                                    strings: [`Hallo bi `],
                                    autoStart: true,
                                    loop: true,
                                    delay:75
                                }}
                                className="type-header"
                        />

                        <p id="maafinakuyabi">
                                3 July 2022, hahaha aku seneng deh chat lagi. wkwk belaga bego aja deh aku sok sok reply storymu HAHAHAHAH, <br />
                                move on tuh susah ya ajg. ketika kamu sadar bahwa kesempatan kedua itu akan selalu ada. yuk mulai dari awal lg

                            
                            
                        </p>
                    {/* </p> */}
                    {/* <div className="option-1-hello-question">
                        <DatePicker 
                            className="datepicker-acid"
                            selected={startDate}
                            minDate={new Date()}
                            
                            onChange={(date) => setStartDate(date)}  
                            showTimeSelect
                            includeDateIntervals={[
                                { start: subDays(new Date(), 5), end: addDays(new Date(), 5) },
                              ]}
                          
                            />
                        <input type="number" placeholder="Jam Berapa Bisa Pergi ?" className="input-acid" onChange={(e)=>setJam(e.target.value)} />
                        <input type="text" placeholder="Maunya Pergi Kemana?" className="input-acid" onChange={(e)=>setKemana(e.target.value)}/>
                        <input type="text" placeholder="Sukanya Makan Apa?"className="input-acid" onChange={(e)=>setMakan(e.target.value)}/>
                       
                    </div> */}
                    <div className="option-1-button" onClick={()=>start_game(3)}>
                        Next
                    </div>
                </div>
                :
                <div className="option-3-hello-container">


                    {
                        finalButton ?
                        <>
                        <div className="final-page">
                                <Typewriter
                                    options={{
                                        strings: ['GAGAL BALI BIIIIII, tapi gpp. masih ada trip trip selanjutnyaaaaaaa :p'],
                                        autoStart: true,
                                        loop: true,
                                        // deleteAll:100
                                        delay:50
                                    }}
                                    className="type-header"
                                /> 
                            <div className="option-3-button" onClick={()=>start_game(4)}>
                                <a href={`https://wa.me/6287785192296/?text=${finalResult}`} onClick={()=>window.open(google(event))}>YUK JALAN!</a>
                            </div>
                        </div>
                        </>
                        :
                        <div className="last-question">
                            <p>Can we <span>"start"</span>  again one day ?</p>
                            <select className="form-select form-select-sm select-pacar"   aria-label=".form-select-sm example"
                            onChange={e =>pacar(e.target.value)} 
                            >
                                <option value="Choose your Answer" selected>Choose your Answer</option>
                                <option value="NO">NO</option>
                                <option value="YES">YES</option>
                            </select>
                        </div>
                    }
                    
                    {

                        isPacar === ''?
                        <p></p>
                        :
                        isPacar  === 'NO'?
                        <>
                            <div className="udh-pacar">
                                <p>Terimakasih ya bi, jika suatu saat ada kesempatan kedua, aku gaakan sia siain lagi. </p>
                                <a href="https://drive.google.com/drive/folders/1G9x9I0DSubMVaGE2c2O2Supx-ERGOeSF?usp=sharing" target="_blank">Our memories</a>
                                {/* <p>kalo udah putus kabarin!</p> */}
                            </div>
                            <div className="btn-closetab" onClick={bubar}>
                                <a href="https://www.google.com/search?q=mengsedih" target="_blank" >BYE!</a>
                            </div>
                        </>
                        :
                        
                        <>
                            <div className="result">
                                <p>lets meet up!!!! I MISS YOU!</p>
                            </div>

                            {
                                openCamera?
                                <div className="send-photo">
                                    <Webcam
                                        audio={false}
                                        height={'100%'}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        width={'100%'}
                                        videoConstraints={videoConstraints}
                                    />
                                    
                                    <button onClick={capture}>Photo For BAYU</button>
                                </div>
                                :
                                <div className="btn-camera" onClick={()=>setOpenCamera(true)}>
                                    <p>SEND YOUR SMILE BIBIIIII!</p>
                                </div>

                            }

                            <div className="box-button-final">
                                {/* <div className='btn-calender'>
                                    <a href={google(event)} target="_blank">Google Calendar</a>
                                </div>
                                <div className='btn-calender'>
                                    <a href={ics(event)} target="_blank" >Apple Calendar</a>
                                </div> */}
                                <div className="option-3-button" onClick={()=>start_game(2)}>
                                    Ganti Jawaban
                                </div>
                                <div className="option-3-button" onClick={()=>start_game(3)}>
                                    YUK
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