import React from 'react'

export const Footer = () => {
  return (
    <>
        <footer id="bottom" data-anchor="true" data-name="Footer" className="footer o_footer o_colored_level o_cc">
            <div id="footer" className="oe_structure oe_structure_solo" style={{}}>
                <section className="s_text_block pt56 pb56" data-snippet="s_text_block" data-name="Text" style={{ backgroundImage: 'none' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 d-flex flex-column justify-content-between o_colored_level">
                                <div> <img src="/tmp/logo.png" className="img-fluid w-50 mx-auto" alt="Cupcake Factory logo" loading="lazy" />
                                    <h4 className="pt32 x_heading_fonts fst-italic">
                                        <span style={{ verticalAlign: 'inherit' }}>Baked&nbsp;with love,&nbsp;<br />served with joy.
                                        </span>
                                    </h4>
                                </div>
                            </div>
                            <div className="col-lg-3 pt-5 pt-lg-0 o_colored_level"> </div>
                            <div className="col-lg-3 pt-5 pt-lg-0 o_colored_level">
                                <h5>
                                    <span style={{ verticalAlign: 'inherit' }}>Our Shops</span>
                                </h5>
                                <div className="s_hr pt8" data-snippet="s_hr" data-name="Separator">
                                    <hr className="w-75 mr-auto border-secondary" />
                                </div>
                                <div className="pb40 pt16">
                                    <h6>Main Shop</h6>
                                    <p className="mb-0"> <a href="#" target="_blank" data-bs-original-title="" title="">
                                        123 Cupcake Lane</a>, Sweet City 
                                    </p>
                                </div>
                                <div className="pb40">
                                    <h6>
                                        <span style={{ verticalAlign: 'inherit' }}>Takeaway Shop</span>
                                    </h6>
                                    <p className="mb-0"> 
                                        <a href="#" target="_blank">
                                            <span style={{ verticalAlign: 'inherit' }}>456 Muffin Street, Sweet City</span>
                                        </a>
                                     </p>
                                </div>
                                <div>
                                    <h6>Factory & Vending Machine</h6>
                                    <p className="mb-0"> 
                                    <a href="#" target="_blank">
                                        <span style={{ verticalAlign: 'inherit' }}>789 Pastry Avenue, Sweet City</span>
                                    </a> 
                                    </p> 
                                    <a className="mt-0 text-o-color-5" href="tel:+123 456 789">
                                        <i className="fa fa-chevron-right fa-1x text-o-color-4" ></i>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 d-flex flex-column justify-content-between pt-5 pt-lg-0 o_colored_level">
                                <div>
                                    <h5>
                                        <span data-o-link-zws="start" ></span>
                                        <span style={{ verticalAlign: 'inherit' }}>Contact</span>
                                    </h5>
                                    <div className="s_hr pt8 pb8" data-snippet="s_hr" data-name="Separator">
                                        <hr className="w-75 mr-auto border-secondary" />
                                    </div>
                                    <br />
                                    <a className="mt-0 text-o-color-5"
                                        href="mailto:info&#64;cupcakefactory.com">info&#64;cupcakefactory.com</a>
                                    <br />
                                    <a href="/en_GB/contactus" className="active" data-bs-original-title="" title="">
                                        <span data-o-link-zws="start"></span>
                                        <span style={{ verticalAlign: 'inherit' }}>Say hello!&nbsp;</span>
                                    </a>
                                    Tax number: BE 000000000<br />Business number:&nbsp;0000.000.000<br />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    </>
  )
}


