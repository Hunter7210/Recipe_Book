import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
    <div class="bannerhome">
        <div class="bannertext">
            <h1 style={{fontSize: '256px'}}>COZINHE</h1>
            <h1 style={{fontSize: '156px'}}>COM PRAZER</h1>
        </div>
        <img src="https://i.postimg.cc/vHy4bHLK/strawberry.png"/>
    </div>
    <div class="galeria">
        <ul>
            <li class="galeriaitem" style={{backgroundColor: '#8F9FA4'}}>Suas receitas</li>
            <li class="galeriaitem" style={{backgroundColor: '#616C71'}}>Bem avaliadas</li>
            <li class="galeriaitem" style={{backgroundColor: '#3E505C'}}>Novas receitas</li>
        </ul>
    </div>
    <hr/>
    </div>
  );
}
