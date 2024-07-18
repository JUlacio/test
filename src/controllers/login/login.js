import { Clientes } from "../../models/cliente.model.js";
import { Contadoras } from "../../models/contadora.model.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../../utils/token.js"; // asegurarse de que la extensión es correcta

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = null;

    // Buscar en Contadoras
    usuario = await Contadoras.findOne({
      where: {
        email,
      },
    });

    // Si no se encuentra en Contadoras, buscar en Clientes
    if (!usuario) {
      usuario = await Clientes.findOne({
        where: {
          email,
        },
      });
    }

    // Si no se encuentra en ninguna tabla, devolver error
    if (!usuario) {
      return res.status(400).json({
        status: "error",
        message: "El usuario no existe",
      });
    }

    // Validar contraseña
    const validarPassword = await bcryptjs.compare(password, usuario.password);

    if (!validarPassword) {
      return res.status(400).json({
        status: "error",
        message: "Ingreso inválido",
      });
    }

    // Eliminar contraseña del objeto usuario
    delete usuario.dataValues.password;

    // Generar tokens
    const { token, refreshToken } = await generarJWT(
      usuario.id_contadora || usuario.id_cliente,
      usuario.email,
      usuario.rol || 'Cliente'
    );

    res.status(200).json({
      status: "success",
      message: "Logueado con éxito",
      usuario: usuario,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al hacer el login",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};
