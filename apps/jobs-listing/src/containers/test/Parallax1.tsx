import "./parrallax1.style.css"

const Parallax1 = () => {

  return <div className="parallax-container">
    <header>
      <h1><a href="https://ksesocss.blogspot.com/2013/01/sticky-header-shadow-footer-parallax.html">KaiCSS
        <img src="https://2.bp.blogspot.com/-Ycpx_Jl2zBc/UG5BMFNpZWI/AAAAAAAACGo/ikysNYg5_q0/s1600/k.jpg" alt="sólo una pic para ilustrar" /></a></h1>
    </header>

    <article>
      <h2>La sombra del header se queda fija y reduce al llegar al top</h2>
      <p>Fíjate qué sucede <b>con la sombra del header</b> (box-shadow) al hacer scroll en la página: al alcanzar el top de la ventana permanece fija a la vez que se acorta ligeramente. Pasa de ocupar toda la anchura de la ventana a dejar un espacio en los laterales. El efecto está realizado sólo con puro CSS. Lógicamente, como <b>position: sticky;</b> aún no es operativo hay que recurrir a simularlo.<br />
        El segundo efecto de la demo está al final de la página en la forma de mostrar el pie de página o footer. Es el conocido como <b>Parallax scroll</b> o revelado de abajo hacia arriba. También logrado con puro Css. El resto sólo a efectos ornamentales.</p>
      <h2>Otro párrafo más de relleno en dos columnas</h2>
      <p>Et ipsum pede malesuada nulla vel sollicitudin Curabitur lacus in risus. Nisl at dignissim aliquet tincidunt sapien dui Donec justo malesuada nulla. Wisi pretium tincidunt Fusce eros lacinia congue lacus non sed Nam. Nunc pellentesque nascetur magna neque adipiscing magnis amet augue justo vitae. Rutrum egestas enim felis Duis cursus ac nibh id ac tristique. Curabitur vitae et Donec pretium enim interdum adipiscing commodo dolor a. Hac Morbi mus sit orci mollis auctor mollis Ut Nunc justo. Ornare nec velit vel tincidunt dui tellus pretium Cras nibh Donec. In fames neque fermentum Quisque fames fringilla at amet mollis et. Mi sit amet sed Integer nunc est facilisis felis ut rhoncus. Nunc habitant et eget magnis cursus wisi et quis et amet. Auctor hendrerit non In Nam malesuada convallis nibh in Nam leo. Amet sit justo tortor sed id ante facilisi in Nam iaculis. Nec nunc eu et vitae pretium Pellentesque mauris non lacinia lacus. Sed tempus Morbi vestibulum pellentesque enim Pellentesque malesuada fermentum Curabitur porttitor. Senectus at adipiscing Aenean ligula nec nulla egestas lacus vitae est.</p>
      <h2>Último párrafo que precede al footer que os será revelado...</h2>
      <p>Tincidunt sagittis suscipit nunc felis ut dui laoreet sem eget Curabitur. Ultrices cursus tincidunt fames sem tortor lacus ac Cum interdum libero. Pretium platea penatibus elit aliquet Integer Quisque est mauris consequat Curabitur. Id orci lobortis Sed dolor mus feugiat eros Lorem dolor Vestibulum. Vivamus consectetuer amet a Nam Suspendisse libero Duis augue orci Ut. Congue et accumsan lobortis elit condimentum Nam a risus Curabitur nunc. Id Ut tellus adipiscing sit felis et semper at feugiat Nam. Laoreet lacinia Duis Donec ac vitae augue Vestibulum congue nunc nec. Sed at pulvinar vitae elit Pellentesque auctor adipiscing laoreet Quisque augue. Molestie semper mollis Sed convallis volutpat ut Nulla mauris laoreet aliquam. Dictumst Nam Nulla Integer urna et Nam faucibus pretium convallis quis. Nam vitae congue laoreet ipsum eu at In pretium Aenean orci. Massa pretium tincidunt tincidunt tempor nunc adipiscing elit eu ut cursus.</p>
      <h2>El pie de pág. se revela de abajo a arriba (Parallax Scroll):</h2>
    </article>

    <footer>
      <ul id="pag_amigos">
        <li>
          <a href="#">Proimagen7<br />
            Multimedia &<br />Postproducción
            <img src="https://1.bp.blogspot.com/-epSlJC5NIe8/T7bHucvfFAI/AAAAAAAAAlM/xwlH_UGNmJY/s1600/proimagen7.jpg" />
          </a>
        </li>
        <li>
          <a href="#">Pao Magariños<br />
            Artista digital &<br />
            Pintura asfáltica<br />
            <img src="https://4.bp.blogspot.com/--3_78JXiQhc/T7bHtxmM3_I/AAAAAAAAAlA/U8haR9RwrKE/s1600/autosconarte.jpg" />
          </a>
        </li>
        <li>
          <a href="#">Librosweb<br />
            Antes de preguntar<br />
            Lee<br />
            <img src="https://4.bp.blogspot.com/-Au6RdZqbpqQ/UFn7RJ5cGuI/AAAAAAAAB3o/5pt4epVfCp8/s1600/librosweb.jpg" />
          </a>
        </li>
        <li>
          <a href="h#">Resouces &<br />
            News. This is<br />
            RESPONSIVE<br />
            <img src="https://3.bp.blogspot.com/-apHO5t2MEcw/UFn5ZqnFevI/AAAAAAAAB3Y/eBAJJ0KOAEo/s1600/this-is-responsive.jpg" />
          </a>
        </li>
        <li className="li-sesenta">
          <a className="sesenta" href="#">W3c<br />
            Todo el CSS<br />
            a 1 click<br />
            <img src="https://3.bp.blogspot.com/-b7uSg49JM-w/T7pBSACyybI/AAAAAAAAAms/CM87KgJlo94/s1600/w3c.jpg" />
          </a>
        </li>
        <li className="li-sesenta">
          <a className="sesenta" href="#">CSSplay<br />
            Doing it width<br />
            STYLE<br />
            <img src="https://2.bp.blogspot.com/-CpuKm4vOp4E/T7owPCnt2RI/AAAAAAAAAmc/QOy0gZeCksE/s1600/cssplay.jpg" />
          </a>
        </li>
        <li className="li-sesenta">
          <a className="sesenta" href="#">Codepen.io<br />
            Demo or it<br />
            didn´t happen<br />
            <img src="https://2.bp.blogspot.com/-hE7DAuwknMc/UEZqnygWsYI/AAAAAAAABTU/GDVMUSM5N0I/s1600/codepen.jpg" />
          </a>
        </li>
        <li className="li-sesenta">
          <a className="sesenta" href="https://ksesocss.blogspot.com">Argonautas<br />
            por 1 web con<br />
            mucho estilo<br />
            <img src="https://4.bp.blogspot.com/-oX_vsyymiHM/UQBpov07S0I/AAAAAAAAFcc/b5qnAVrcpuw/s1600/kcss.jpg" alt="KsesoCss" />
          </a>
        </li>
      </ul>
    </footer>
  </div>
}


export default Parallax1