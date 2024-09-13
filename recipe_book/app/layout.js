// app/layout.js
import CustomHead from '@/src/components/GlobalHead';
import Navbar from '@/src/components/Navbar';
import './globals.css'; // CSS global

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <CustomHead
        title="MyRecipeBook"
        description="Descrição padrão para o MyRecipeBook"
        keywords="receitas, livro de receitas, comida"
      />
      <body>
        <Navbar />
        {children} {/* Renderiza o conteúdo das páginas */}
      </body>
    </html>
  );
}
