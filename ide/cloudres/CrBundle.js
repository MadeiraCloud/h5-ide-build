(function() {
  define(["constant", "CloudResources", "./CrSubCollection"], function(constant, CloudResources) {
    var CertCollection, DhcpCollection, SnapCollection, SubsCollection, TopicCollection;
    DhcpCollection = CloudResources(constant.RESTYPE.DHCP, "us-west-2");
    DhcpCollection.on("update", function() {
      console.log("==============");
      console.log("==============");
      return console.info(DhcpCollection);
    });
    CertCollection = CloudResources(constant.RESTYPE.IAM, "us-west-2");
    CertCollection.on("update", function() {
      console.log("==============");
      console.log("==============");
      return console.info(CertCollection);
    });
    TopicCollection = CloudResources(constant.RESTYPE.TOPIC, "us-west-2");
    TopicCollection.on("update", function() {
      console.log("==============");
      console.log("==============");
      return console.info(TopicCollection);
    });
    SubsCollection = CloudResources(constant.RESTYPE.SUBSCRIPTION, "us-west-2");
    SubsCollection.on("update", function() {
      console.log("==============");
      console.log("==============");
      return console.info(SubsCollection);
    });
    SnapCollection = CloudResources(constant.RESTYPE.SNAP, "us-east-1");
    SnapCollection.on("update", function() {
      console.log("==============");
      console.log("==============");
      return console.info(SnapCollection);
    });
    DhcpCollection.fetch();
    CertCollection.fetch();
    TopicCollection.fetch();
    SubsCollection.fetch();
    SnapCollection.fetch();
    return window.CrTestcase = {
      RemoveResources: function() {
        if (DhcpCollection.get("dopt-9e6172fc")) {
          DhcpCollection.get("dopt-9e6172fc").destroy();
        }
        if (CertCollection.findWhere({
          Name: "MorrisTestCert2"
        })) {
          CertCollection.findWhere({
            Name: "MorrisTestCert2"
          }).destroy();
        }
        if (TopicCollection.get("arn:aws:sns:us-west-2:994554139310:MorrisTestTopic")) {
          return TopicCollection.get("arn:aws:sns:us-west-2:994554139310:MorrisTestTopic").destroy();
        }
      },
      RemoveResourcesFail: function() {},
      CreateResourcesFail: function() {
        DhcpCollection.create({
          "netbios-node-type": "abc"
        }).save();
        TopicCollection.create({
          Name: ""
        }).save();
        SubsCollection.create({
          Endpoint: "morris@mc2.io",
          Protocol: "email",
          TopicArn: "arn:aws:sns:us-west-2:994554139310:MorrisTestTopicNoneExist"
        }).save();
        return CertCollection.create({
          Name: "MorrisTestCert2",
          PrivateKey: "",
          CertificateBody: ""
        }).save();
      },
      CreateResources: function() {
        DhcpCollection.create({
          "netbios-node-type": ["2"],
          "ntp-servers": ["4.4.4.4", "3.3.3.3"],
          "domain-name": ["www.abc2.com", "www.abc.com"],
          "domain-name-servers": ["12.12.12.12", "13.13.13.13"],
          "netbios-name-servers": ["13.13.13.13", "200.200.200.200"]
        }).save();
        TopicCollection.create({
          Name: "MorrisTestTopic",
          DisplayName: "MorrisTestTopic"
        }).save();
        SubsCollection.create({
          Endpoint: "morris@mc2.io",
          Protocol: "email",
          TopicArn: "arn:aws:sns:us-west-2:994554139310:MorrisTestTopic"
        }).save();
        return CertCollection.create({
          Name: "MorrisTestCert2",
          PrivateKey: "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA2PSMweBuIoF+FG6M24FGiSLZ6l4E5hHkdwpYg/LEE0s5RJ5W\nDUJWt16ixTscYcDK/AoXjSWaN7StyVQ3hHsb9EVlk5ljEISF0DoFMvGqTBATB/Za\nE2TqiVXRUZaaQTFxBgiA5Bme8RDUFr2hpS79NPJ5JZU+qLsamZ/EaJm/8xg3sckY\n9zG/SMYvktMw0Kwb+3Sdn8dZSa3/8FhATEpemAMYCXTzI04hfq5kbLlveklSDsnw\n3vBmMo4pZVnqyd2LGNOITFy7T+R9yQiK3i+yF4c9KIJgGGtIC+9kajU7kMCrmAhq\n2s/a/RN7Oq+hWx2uz0mmWCIe7pLr0HJvC1tqhwIDAQABAoIBAQCd102Qv/dgo1VX\nCBbym9r1aqWgHUbzG5FcCercFIMShmfjxE5W1yy/u9owJBFCDUGgnLcFuZW5cXn+\nP4ckm2x7CwIboDyyh7fTBmNB7RA4xnkSEej2szTvNcBT233ecFoKSaV8TieUuumS\noeQ4iTcujjoVXb94gqeXnOUINNOxx1T3ab4r9JzJDim7hnns3I79XVHVF2NYh3z2\n6ZW5PeHr94Dn4hoswSDRPqDSJmpenmO9jAxgD4RfpeoOX5u8vw48L48kCYINIpZ9\nz1fvmajFn2xFCBOsuKKi6YCXBeBMytwXZeDPbCHOVAsYizVJJOKCVCcARwRJhWpk\nzqeJE3wBAoGBAPzrjfbURp4FSY95LTBFXM5cPsVA0k7CIiLZ5fULr+11PeKdy2Sc\nLtdpDmJXCLh312Y2Q1oRehNQRpuG8I+009+uoGufP4saOifwUJMxt1WQ3fVc/Cqq\nPFFFU65pv2BfMObgRphcwxpCvrZkCwLmVwP99rvaB8TPAnaroDcxrYoJAoGBANuY\n4Sjkcyh+BBWRUH8Q294mBEgfKlfuZ1L1mF5O7iPwdvcOWiskAwoSXROE/FS0vSmM\nVAXmZaJZ+i/HVjr5D3PF9Yrf1op2EesmLK7UwGRC7Fzna53zyYMrkY4jea7EDrCa\nidp0A+Xed1ajqrreIM5YEx+lB22e/ythrhJEkrQPAoGBALIVJYtzYhmnvWjROLkx\nTaxblTMMdkhQNvr1FA6bYQ9AqwdidbDsq6qu5RrnD1PbxgXJFVlYzuzEbELcG4wE\nFd78tSWyJmrKV8KBWiqaKe2MqEw4YbGk1f2fY9F90euIewVFS0/CmPlnn6MLBBnR\nl9lOu6j/VtMDs0ddhtz2FKwJAoGAV7PBCRHkJCHgA7UbjwPuq9RHFX7M7H1careH\nePLRDS12dckXne8t/5HB9o/ALxxYCAXxcMHJiYOh9f8Io1jhIP3IyQQIrRfmpCGE\n6vYxOFm6CIisZFL/AhIeecQVTwUiUMoHkGWRQPcOdl27TBJ2y7JFQPgp9U/w3SSP\n3t/gL2UCgYBRIUMm9Vg06YOzYES2YWpoZfpPevCO4j+dS2MjoTGJ/MTn29ASjrrd\nrkhulebUMEcSDwGtaZUnnSsl+LlklqMlTJWTms4KaOxa64pitdc8zkR8F4iECzEe\nwkI+YJ9kgWQZXQPKgSAiKiPq06nVUfbSp6lqApVHrCi4k5Q8XGoI6A==\n-----END RSA PRIVATE KEY-----",
          CertificateBody: "-----BEGIN CERTIFICATE-----\nMIIFATCCA+mgAwIBAgIQSHW5NjjFcwlWluD7RcFWVTANBgkqhkiG9w0BAQUFADBz\nMQswCQYDVQQGEwJHQjEbMBkGA1UECBMSR3JlYXRlciBNYW5jaGVzdGVyMRAwDgYD\nVQQHEwdTYWxmb3JkMRowGAYDVQQKExFDT01PRE8gQ0EgTGltaXRlZDEZMBcGA1UE\nAxMQUG9zaXRpdmVTU0wgQ0EgMjAeFw0xNDAzMjUwMDAwMDBaFw0xNTAzMjUyMzU5\nNTlaMFsxITAfBgNVBAsTGERvbWFpbiBDb250cm9sIFZhbGlkYXRlZDEdMBsGA1UE\nCxMUUG9zaXRpdmVTU0wgV2lsZGNhcmQxFzAVBgNVBAMUDioudmlzdWFsb3BzLmlv\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2PSMweBuIoF+FG6M24FG\niSLZ6l4E5hHkdwpYg/LEE0s5RJ5WDUJWt16ixTscYcDK/AoXjSWaN7StyVQ3hHsb\n9EVlk5ljEISF0DoFMvGqTBATB/ZaE2TqiVXRUZaaQTFxBgiA5Bme8RDUFr2hpS79\nNPJ5JZU+qLsamZ/EaJm/8xg3sckY9zG/SMYvktMw0Kwb+3Sdn8dZSa3/8FhATEpe\nmAMYCXTzI04hfq5kbLlveklSDsnw3vBmMo4pZVnqyd2LGNOITFy7T+R9yQiK3i+y\nF4c9KIJgGGtIC+9kajU7kMCrmAhq2s/a/RN7Oq+hWx2uz0mmWCIe7pLr0HJvC1tq\nhwIDAQABo4IBpzCCAaMwHwYDVR0jBBgwFoAUmeRAX2sUXj4F2d3TY1T8Yrj3AKww\nHQYDVR0OBBYEFLXrdQPZF6zUlOKQfmkFy4jZ/U30MA4GA1UdDwEB/wQEAwIFoDAM\nBgNVHRMBAf8EAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjBQBgNV\nHSAESTBHMDsGCysGAQQBsjEBAgIHMCwwKgYIKwYBBQUHAgEWHmh0dHA6Ly93d3cu\ncG9zaXRpdmVzc2wuY29tL0NQUzAIBgZngQwBAgEwOwYDVR0fBDQwMjAwoC6gLIYq\naHR0cDovL2NybC5jb21vZG9jYS5jb20vUG9zaXRpdmVTU0xDQTIuY3JsMGwGCCsG\nAQUFBwEBBGAwXjA2BggrBgEFBQcwAoYqaHR0cDovL2NydC5jb21vZG9jYS5jb20v\nUG9zaXRpdmVTU0xDQTIuY3J0MCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5jb21v\nZG9jYS5jb20wJwYDVR0RBCAwHoIOKi52aXN1YWxvcHMuaW+CDHZpc3VhbG9wcy5p\nbzANBgkqhkiG9w0BAQUFAAOCAQEAzhAURhFuwMaWXaKOTUuDE46NjA3gAhdmWcNt\n9m97kddNMzwdLeCmzCAP5pVsSx4PMm1P+eWq46W1C2SObFCL3vLaWB9o4lt+ufmI\n4fTsi76qIhm90IVDQdnz7V9UoyRcXMsKx7HnfaW16DHxjj0bvOjN9VBTzr8BF+fB\nxjTxJiv1yOHxvpE1zn469VTAerDD9US2eusZlf6uh/uB/I4UTjq2LG9dBz+aTPre\nWBkJsNi+RduPwjpNZ5S+kZev03jkhyvaDd1LDduJ3xayX/4ODZVGgp/xe9cxZt+D\ne2xP6Y71oeEL+LVB1lMVMCUDB9zg+GiAmZ3QHv5y/ZabUOmm6w==\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIE5TCCA82gAwIBAgIQB28SRoFFnCjVSNaXxA4AGzANBgkqhkiG9w0BAQUFADBv\nMQswCQYDVQQGEwJTRTEUMBIGA1UEChMLQWRkVHJ1c3QgQUIxJjAkBgNVBAsTHUFk\nZFRydXN0IEV4dGVybmFsIFRUUCBOZXR3b3JrMSIwIAYDVQQDExlBZGRUcnVzdCBF\neHRlcm5hbCBDQSBSb290MB4XDTEyMDIxNjAwMDAwMFoXDTIwMDUzMDEwNDgzOFow\nczELMAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4G\nA1UEBxMHU2FsZm9yZDEaMBgGA1UEChMRQ09NT0RPIENBIExpbWl0ZWQxGTAXBgNV\nBAMTEFBvc2l0aXZlU1NMIENBIDIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK\nAoIBAQDo6jnjIqaqucQA0OeqZztDB71Pkuu8vgGjQK3g70QotdA6voBUF4V6a4Rs\nNjbloyTi/igBkLzX3Q+5K05IdwVpr95XMLHo+xoD9jxbUx6hAUlocnPWMytDqTcy\nUg+uJ1YxMGCtyb1zLDnukNh1sCUhYHsqfwL9goUfdE+SNHNcHQCgsMDqmOK+ARRY\nFygiinddUCXNmmym5QzlqyjDsiCJ8AckHpXCLsDl6ez2PRIHSD3SwyNWQezT3zVL\nyOf2hgVSEEOajBd8i6q8eODwRTusgFX+KJPhChFo9FJXb/5IC1tdGmpnc5mCtJ5D\nYD7HWyoSbhruyzmuwzWdqLxdsC/DAgMBAAGjggF3MIIBczAfBgNVHSMEGDAWgBSt\nvZh6NLQm9/rEJlTvA73gJMtUGjAdBgNVHQ4EFgQUmeRAX2sUXj4F2d3TY1T8Yrj3\nAKwwDgYDVR0PAQH/BAQDAgEGMBIGA1UdEwEB/wQIMAYBAf8CAQAwEQYDVR0gBAow\nCDAGBgRVHSAAMEQGA1UdHwQ9MDswOaA3oDWGM2h0dHA6Ly9jcmwudXNlcnRydXN0\nLmNvbS9BZGRUcnVzdEV4dGVybmFsQ0FSb290LmNybDCBswYIKwYBBQUHAQEEgaYw\ngaMwPwYIKwYBBQUHMAKGM2h0dHA6Ly9jcnQudXNlcnRydXN0LmNvbS9BZGRUcnVz\ndEV4dGVybmFsQ0FSb290LnA3YzA5BggrBgEFBQcwAoYtaHR0cDovL2NydC51c2Vy\ndHJ1c3QuY29tL0FkZFRydXN0VVROU0dDQ0EuY3J0MCUGCCsGAQUFBzABhhlodHRw\nOi8vb2NzcC51c2VydHJ1c3QuY29tMA0GCSqGSIb3DQEBBQUAA4IBAQCcNuNOrvGK\nu2yXjI9LZ9Cf2ISqnyFfNaFbxCtjDei8d12nxDf9Sy2e6B1pocCEzNFti/OBy59L\ndLBJKjHoN0DrH9mXoxoR1Sanbg+61b4s/bSRZNy+OxlQDXqV8wQTqbtHD4tc0azC\ne3chUN1bq+70ptjUSlNrTa24yOfmUlhNQ0zCoiNPDsAgOa/fT0JbHtMJ9BgJWSrZ\n6EoYvzL7+i1ki4fKWyvouAt+vhcSxwOCKa9Yr4WEXT0K3yNRw82vEL+AaXeRCk/l\nuuGtm87fM04wO+mPZn+C+mv626PAcwDj1hKvTfIPWhRRH224hoFiB85ccsJP81cq\ncdnUl4XmGFO3\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIENjCCAx6gAwIBAgIBATANBgkqhkiG9w0BAQUFADBvMQswCQYDVQQGEwJTRTEU\nMBIGA1UEChMLQWRkVHJ1c3QgQUIxJjAkBgNVBAsTHUFkZFRydXN0IEV4dGVybmFs\nIFRUUCBOZXR3b3JrMSIwIAYDVQQDExlBZGRUcnVzdCBFeHRlcm5hbCBDQSBSb290\nMB4XDTAwMDUzMDEwNDgzOFoXDTIwMDUzMDEwNDgzOFowbzELMAkGA1UEBhMCU0Ux\nFDASBgNVBAoTC0FkZFRydXN0IEFCMSYwJAYDVQQLEx1BZGRUcnVzdCBFeHRlcm5h\nbCBUVFAgTmV0d29yazEiMCAGA1UEAxMZQWRkVHJ1c3QgRXh0ZXJuYWwgQ0EgUm9v\ndDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALf3GjPm8gAELTngTlvt\nH7xsD821+iO2zt6bETOXpClMfZOfvUq8k+0DGuOPz+VtUFrWlymUWoCwSXrbLpX9\nuMq/NzgtHj6RQa1wVsfwTz/oMp50ysiQVOnGXw94nZpAPA6sYapeFI+eh6FqUNzX\nmk6vBbOmcZSccbNQYArHE504B4YCqOmoaSYYkKtMsE8jqzpPhNjfzp/haW+710LX\na0Tkx63ubUFfclpxCDezeWWkWaCUN/cALw3CknLa0Dhy2xSoRcRdKn23tNbE7qzN\nE0S3ySvdQwAl+mG5aWpYIxG3pzOPVnVZ9c0p10a3CitlttNCbxWyuHv77+ldU9U0\nWicCAwEAAaOB3DCB2TAdBgNVHQ4EFgQUrb2YejS0Jvf6xCZU7wO94CTLVBowCwYD\nVR0PBAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wgZkGA1UdIwSBkTCBjoAUrb2YejS0\nJvf6xCZU7wO94CTLVBqhc6RxMG8xCzAJBgNVBAYTAlNFMRQwEgYDVQQKEwtBZGRU\ncnVzdCBBQjEmMCQGA1UECxMdQWRkVHJ1c3QgRXh0ZXJuYWwgVFRQIE5ldHdvcmsx\nIjAgBgNVBAMTGUFkZFRydXN0IEV4dGVybmFsIENBIFJvb3SCAQEwDQYJKoZIhvcN\nAQEFBQADggEBALCb4IUlwtYj4g+WBpKdQZic2YR5gdkeWxQHIzZlj7DYd7usQWxH\nYINRsPkyPef89iYTx4AWpb9a/IfPeHmJIZriTAcKhjW88t5RxNKWt9x+Tu5w/Rw5\n6wwCURQtjr0W4MHfRnXnJK3s9EK0hZNwEGe6nQY1ShjTK3rMUUKhemPR5ruhxSvC\nNr4TDea9Y355e6cJDUCrat2PisP29owaQgVR1EX1n6diIWgVIEM8med8vSTYqZEX\nc4g/VhsxOBi0cQ+azcgOno4uG+GMmIPLHzHxREzGBHNJdmAPx/i9F4BrLunMTA5a\nmnkPIAou1Z5jJh5VkpTYghdae9C8x49OhgQ=\n-----END CERTIFICATE-----"
        }).save();
      }
    };
  });

}).call(this);
