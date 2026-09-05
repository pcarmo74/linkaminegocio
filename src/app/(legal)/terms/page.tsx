import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        &larr; Volver al inicio
      </Link>

      <article className="prose dark:prose-invert mt-8 max-w-none">
        <h1>Términos de Servicio</h1>
        <p className="text-sm text-muted-foreground">
          Última actualización: 4 de septiembre de 2026
        </p>

        <h2>1. Introducción</h2>
        <p>
          Bienvenido a LinkaMiNegocio, operado por Biz Solutions Partner. Al
          acceder o usar nuestro servicio, aceptas quedar sujeto a estos
          Términos de Servicio. Por favor, léelos con atención antes de usar
          la plataforma.
        </p>

        <h2>2. Uso del Servicio</h2>
        <p>
          Puedes usar nuestro servicio únicamente de acuerdo con estos
          términos y todas las leyes y regulaciones aplicables. Aceptas no
          hacer un mal uso del servicio ni ayudar a alguien más a hacerlo.
        </p>

        <h2>3. Cuentas de Usuario</h2>
        <p>
          Eres responsable de mantener la confidencialidad de las
          credenciales de tu cuenta y de todas las actividades que ocurran
          bajo tu cuenta. Debes notificarnos de inmediato sobre cualquier uso
          no autorizado.
        </p>

        <h2>4. Propiedad Intelectual</h2>
        <p>
          Todo el contenido, marcas registradas y datos en esta plataforma
          son propiedad de Biz Solutions Partner o sus licenciantes.
          Conservas la propiedad de cualquier contenido que envíes, pero nos
          otorgas una licencia para usarlo en relación con la operación del
          servicio.
        </p>

        <h2>5. Limitación de Responsabilidad</h2>
        <p>
          En la máxima medida permitida por la ley, Biz Solutions Partner no
          será responsable de daños indirectos, incidentales, especiales,
          consecuentes o punitivos que surjan de o estén relacionados con tu
          uso del servicio.
        </p>

        <h2>6. Cambios a los Términos</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier
          momento. Notificaremos cambios importantes publicando los términos
          actualizados en nuestro sitio web. Tu uso continuado del servicio
          constituye la aceptación de los términos revisados.
        </p>

        <h2>7. Contacto</h2>
        <p>
          Si tienes preguntas sobre estos Términos de Servicio, contáctanos
          en contact@bizsolutionspartner.com. Nuestro equipo de soporte está
          disponible para ayudarte.
        </p>
      </article>
    </div>
  );
}
