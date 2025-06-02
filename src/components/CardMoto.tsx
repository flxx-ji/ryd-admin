// src/components/CardMoto.tsx

type MotoProps = {
  nom: string;
  marque: string;
  image: string;
  description: string;
};

export default function CardMoto({ nom, marque, image, description }: MotoProps) {
  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" alt={nom} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{nom}</h5>
            <p className="card-text">
              <strong>Marque :</strong> {marque}
            </p>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
