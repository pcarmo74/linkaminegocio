import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        &larr; Volver al inicio
      </Link>

      <article className="prose dark:prose-invert mt-8 max-w-none">
        <h1>Política de Privacidad</h1>
        <p className="text-sm text-muted-foreground">
          Última actualización: 4 de septiembre de 2026
        </p>

        <h2>1. Introducción</h2>
        <p>
          Tu privacidad es importante para nosotros. Esta Política de
          Privacidad explica cómo Biz Solutions Partner recopila, usa,
          divulga y protege tu información cuando usas LinkaMiNegocio.
        </p>

        <h2>2. Información que Recopilamos</h2>
        <p>
          Recopilamos información que nos proporcionas directamente, como tu
          nombre y dirección de correo electrónico. También recopilamos
          automáticamente cierta información sobre tu dispositivo y el uso
          del servicio.
        </p>

        <h2>3. Cómo Usamos tu Información</h2>
        <p>
          Usamos la información que recopilamos para proporcionar y mantener
          el servicio, enviarte comunicaciones relacionadas y mejorar
          nuestra plataforma. También podemos usar tu información para
          análisis y personalizar tu experiencia.
        </p>

        <h2>4. Almacenamiento de Datos</h2>
        <p>
          Tus datos se almacenan en servidores de Firebase (Google Cloud) y
          están protegidos mediante encriptación estándar de la industria.
          Conservamos tu información personal solo durante el tiempo
          necesario para cumplir los propósitos descritos en esta política.
        </p>

        <h2>5. Servicios de Terceros</h2>
        <p>
          Empleamos Firebase (Google Cloud) para operar y almacenar los
          datos de la plataforma. Estos terceros tienen acceso a tu
          información solo para realizar tareas en nuestro nombre.
        </p>

        <h2>6. Tus Derechos</h2>
        <p>
          De acuerdo con la Ley 1581 de 2012 (Habeas Data) de Colombia,
          tienes derecho a conocer, actualizar y rectificar tus datos
          personales; a solicitar prueba de la autorización otorgada; a ser
          informado sobre el uso de tus datos; a presentar quejas ante la
          Superintendencia de Industria y Comercio (SIC); a revocar tu
          autorización y/o solicitar la eliminación de tus datos; y a
          acceder de forma gratuita a tus datos personales. Contáctanos en
          contact@bizsolutionspartner.com para ejercer estos derechos.
        </p>

        <h2>7. Cambios a esta Política</h2>
        <p>
          Podemos actualizar esta Política de Privacidad de vez en cuando.
          Te notificaremos sobre cualquier cambio publicando la nueva
          política en esta página y actualizando la fecha en la parte
          superior.
        </p>

        <h2>8. Contacto</h2>
        <p>
          Si tienes preguntas sobre esta Política de Privacidad, contáctanos
          en contact@bizsolutionspartner.com. Nuestro equipo de soporte está
          disponible para ayudarte.
        </p>
      </article>
    </div>
  );
}
