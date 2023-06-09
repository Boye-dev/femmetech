import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import "./Carousel.css"
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import image from "../../assets/images/test-image.png";
import quote from "../../assets/images/quote.png"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const TestimonialCarousel = () => {
    const testimonials = [
        { 
            id: 1, 
            name: "Sanni Collins", 
            text: 'The innovative appointment booking service provided by Nexus enables patients to effortlessly schedule appointments with highly skilled doctors. Patients seeking specialized medical care can rely on this platform to ensure prompt access to healthcare services.' 
        },
        { 
            id: 2, 
            name: "Oyelola Adeboye", 
            text: 'By accessing the user-friendly interface, patients can browse through a diverse range of doctors specializing in various medical fields. From primary care physicians to renowned specialists, Nexus\' appointment booking service seamlessly connects patients with the right healthcare professionals to meet their specific needs.' 
        },
        { 
            id: 3, 
            name: "Olufemi Nifemi", 
            text: 'Gone are the days of lengthy phone calls and waiting in queues. Nexus streamlines the appointment booking process, allowing patients to conveniently navigate available doctors\' profiles, check their availability, and select a suitable time slot that aligns with their busy schedules.' },
        { 
            id: 3, 
            name: "Oni Boluwatife", 
            text: 'Patient satisfaction and personalized care are paramount for Nexus. Through the appointment booking service, patients are encouraged to provide their preferences and medical history, enabling doctors to gain valuable insights even before the initial appointment. This personalized approach ensures a tailored and efficient healthcare experience.' 
        },
        { 
            id: 3, 
            name: "Olaogun Tamilore", 
            text: 'In addition to facilitating appointments, the service encompasses features like appointment reminders, electronic medical records access, and feedback systems. By providing comprehensive tools, Nexus empowers patients to actively participate in their healthcare journey and fosters stronger doctor-patient relationships.' 
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
        }, 6000);

        return () => {
        clearInterval(timer);
        };
    }, []);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleSlide = (index) => {
        setActiveIndex(index);
      };
    
    return (
        <Box>
            <Grid2 container>
                <Grid2 item xs={1}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <Box 
                            onClick={handlePrev} 
                            sx={{
                                padding: "6px", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center", 
                                background: "#EB2B31", 
                                borderRadius: "50%", 
                                cursor: "pointer"
                            }}
                        >
                            <NavigateBeforeIcon fontSize='large' sx={{color: '#fff'}}/>
                        </Box>
                    </Box>                   
                </Grid2>
                <Grid2 item xs={10}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            background: "#FBFBFB",
                            padding: "34px 50px 50px",
                            boxSizing: "border-box",
                            borderRadius: "14px"
                        }}
                    >
                        <Box 
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap"
                            }}
                        >
                            
                            <img src={image} style={{width: "20%"}} alt="" />
                            
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: "48px", 
                                    marginTop: "6px",
                                    color: "#000",
                                    width: "100%",
                                    textAlign: "center",
                                }}
                            >
                                {testimonials[activeIndex].name}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    background: ""
                                }}
                            >
                                <Box
                                    sx={{
                                    width: "60px",
                                    height: "3px",
                                    backgroundColor: "#EB2B31",
                                    borderRadius: "6px",
                                    mt: 2,
                                    mb: 2,
                                    borderBottom: "20px"
                                    }}
                                />
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    textAlign: "center",
                                    width: "100%", 
                                    marginBottom: "9px",
                                    color: "#000",
                                    fontWeight: 300,

                                }}
                            >
                                {testimonials[activeIndex].text}
                            </Typography>
                            
                            <img src={quote}  alt="" />
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 item xs={1}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <Box 
                            onClick={handleNext} 
                            sx={{
                                padding: "6px", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center", 
                                background: "#EB2B31", 
                                borderRadius: "50%", 
                                cursor: "pointer"
                            }}
                        >
                            <NavigateNextIcon fontSize='large' sx={{color: '#fff'}}/>
                        </Box>
                    </Box>    
                </Grid2>
            </Grid2>
            
            <div className="indicators">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={testimonial.id}
                        className={`indicator ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleSlide(index)}
                    />
                ))}
            </div>
        </Box>
  ) ;
};

export default TestimonialCarousel;
