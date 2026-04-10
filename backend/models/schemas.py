from pydantic import BaseModel

class ClientUpdate(BaseModel):
    client_id: str
    organization: str
    num_samples: int
    demographic_parity: float
    group0_accuracy: float
    group1_accuracy: float
    pos_rate_g0: float
    pos_rate_g1: float