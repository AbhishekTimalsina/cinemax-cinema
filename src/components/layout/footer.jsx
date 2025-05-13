export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white ">
      <div className="border-t border-gray-800 py-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} CINEMAX. All rights reserved.</p>
      </div>
    </footer>
  );
}
