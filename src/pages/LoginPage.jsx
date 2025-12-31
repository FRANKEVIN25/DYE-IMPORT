const LoginPage = ({ adminPassword, setAdminPassword, setIsAdmin, setView }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
    <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <span className="text-4xl text-white font-bold">🔒</span>
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-2">Panel Admin</h2>
        <p className="text-gray-600">Ingresa tus credenciales</p>
      </div>
      
      <input
        type="password"
        placeholder="Contraseña"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && (adminPassword === 'admin123' ? (setIsAdmin(true), setView('admin'), setAdminPassword('')) : alert('Contraseña incorrecta'))}
        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-lg mb-6"
      />
      
      <button
        onClick={() => adminPassword === 'admin123' ? (setIsAdmin(true), setView('admin'), setAdminPassword('')) : alert('Contraseña incorrecta')}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      >
        Ingresar al Panel
      </button>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <p className="text-center text-sm text-gray-600">
          <strong>Demo:</strong> Contraseña: <code className="bg-gray-200 px-3 py-1 rounded-lg font-mono">admin123</code>
        </p>
      </div>
    </div>
  </div>
);

export default LoginPage;