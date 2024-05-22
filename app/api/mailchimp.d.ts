declare module '@mailchimp/mailchimp_marketing' {
    interface Config {
      apiKey: string;
      server: string;
    }
  
    interface ListMember {
      email_address: string;
      status: string;
      merge_fields?: {
        [key: string]: any;
      };
    }
  
    interface Lists {
      addListMember(listId: string, member: ListMember): Promise<any>;
    }
  
    interface Mailchimp {
      apiKey: any;
      server: any;
      setConfig(config: Config): void;
      lists: Lists;
    }
  
    const mailchimp: Mailchimp;
    export default mailchimp;
  }
  