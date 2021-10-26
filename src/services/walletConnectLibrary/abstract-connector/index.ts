import { Observable } from 'rxjs';

import { IConnectorMessage, IProvider } from '../interface';

export abstract class AbstractConnector {
  public abstract connector: any;

  public abstract connect(provider?: IProvider, chainUsed?: number): Promise<IConnectorMessage>;

  public abstract getAccounts(): Observable<any>;
}
